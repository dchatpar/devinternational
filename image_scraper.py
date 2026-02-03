
import asyncio
import aiohttp
import logging
import os
import re
import random
import hashlib
from pathlib import Path
from typing import List, Optional, Tuple, Set
from urllib.parse import quote_plus, urlparse
from PIL import Image
from io import BytesIO
from duckduckgo_search import DDGS

# --- CONFIGURATION ---
OUTPUT_DIR = Path("public/assets/visionary")
MANIFEST_FILE = OUTPUT_DIR / "manifest.json"
MIN_WIDTH = 1920
MIN_HEIGHT = 1080
MIN_FILE_SIZE = 250 * 1024  # 250KB (lowered slightly to catch more valid images)
MAX_FILE_SIZE = 15 * 1024 * 1024 # 15MB
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
]

# --- LOGGING SETUP ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- UTILS ---
def get_random_header():
    return {'User-Agent': random.choice(USER_AGENTS)}

def clean_filename(query: str, engine: str, idx: int) -> str:
    slug = re.sub(r'[^a-z0-9]+', '-', query.lower()).strip('-')
    return f"{slug}_{engine}_{idx}.jpg"

class ImageValidator:
    @staticmethod
    def is_valid_image(content: bytes) -> Tuple[bool, str]:
        if len(content) < MIN_FILE_SIZE:
             return False, f"File too small: {len(content)/1024:.1f}KB"
        if len(content) > MAX_FILE_SIZE:
             return False, "File too large"
             
        try:
            img = Image.open(BytesIO(content))
            w, h = img.size
            
            # Aspect ratio check (prefer landscape)
            if h > w:
                return False, "Portrait orientation (prefer landscape)"
            
            if w < MIN_WIDTH or h < MIN_HEIGHT:
                return False, f"Resolution too low: {w}x{h}"
                
            return True, "OK"
        except Exception as e:
            return False, f"Invalid image data: {e}"

# --- ENGINES ---

class BaseScraper:
    async def fetch_image(self, session: aiohttp.ClientSession, url: str) -> Optional[bytes]:
        try:
            async with session.get(url, headers=get_random_header(), timeout=10) as response:
                if response.status == 200:
                    return await response.read()
        except:
            pass
        return None

class DuckDuckGoEngine(BaseScraper):
    def scrape(self, query: str, limit: int = 15) -> List[str]:
        """Uses official lib"""
        urls = []
        try:
            logger.info(f"🦆 [DDG] Searching for: {query}")
            results = DDGS().images(keywords=query, region="ca-en", safesearch="off", size="Wallpaper", max_results=limit*2)
            urls = [r['image'] for r in results if r.get('image')]
            logger.info(f"🦆 [DDG] Found {len(urls)} URLs")
        except Exception as e:
            logger.error(f"🦆 [DDG] Failed: {e}")
        return urls

class BingEngine(BaseScraper):
    async def scrape(self, session: aiohttp.ClientSession, query: str, limit: int = 10) -> List[str]:
        """Scrapes Bing using regex"""
        urls = []
        try:
            logger.info(f"🖼️ [Bing] Searching for: {query}")
            url = f"https://www.bing.com/images/async?q={quote_plus(query)}&first=0&count={limit*2}&scenario=ImageBasicHover&datsrc=N_I&layout=ColumnBased&mmasync=1"
            
            async with session.get(url, headers=get_random_header()) as response:
                text = await response.text()
                # Extract murl (media url)
                matches = re.findall(r'murl&quot;:&quot;(.*?)&quot;', text)
                urls.extend(matches)
                logger.info(f"🖼️ [Bing] Found {len(matches)} URLs")
        except Exception as e:
            logger.error(f"🖼️ [Bing] Failed: {e}")
        return urls

class PinterestViaBingEngine(BaseScraper):
    async def scrape(self, session: aiohttp.ClientSession, query: str, limit: int = 10) -> List[str]:
        """Finds Pinterest images via Bing site search (bypasses auth)"""
        if "pinterest" in query.lower():
            return [] # Avoid recursion if query already has it
        
        pinterest_query = f"site:pinterest.com {query} aesthetic high resolution"
        return await BingEngine().scrape(session, pinterest_query, limit)


# --- MAIN CONTROLLER ---

class MultiEngineScraper:
    def __init__(self):
        self.ddg = DuckDuckGoEngine()
        self.bing = BingEngine()
        self.pinterest = PinterestViaBingEngine()
        self.validator = ImageValidator()
        self.seen_hashes = set()
        
    async def download_and_save(self, session: aiohttp.ClientSession, urls: List[str], query: str, engine_name: str):
        count = 0
        for url in urls:
            if count >= 5: break # Max 5 good images per query per engine
            
            content = await self.ddg.fetch_image(session, url)
            if not content: continue
            
            # Dedupe
            img_hash = hashlib.md5(content).hexdigest()
            if img_hash in self.seen_hashes: continue
            self.seen_hashes.add(img_hash)
            
            # Validate
            param, reason = self.validator.is_valid_image(content)
            if not param:
                # logger.debug(f"Skipped {url[:30]}...: {reason}")
                continue
                
            # Save
            filename = clean_filename(query, engine_name, count)
            filepath = OUTPUT_DIR / filename
            
            with open(filepath, 'wb') as f:
                f.write(content)
                
            logger.info(f"✅ Saved [{engine_name}] {filename}")
            count += 1

    async def run(self):
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        
        queries = [
            "diverse tech professionals meeting vancouver office glass walls",
            "happy international students university of toronto campus laughing",
            "young family walking stanley park vancouver autumn",
            "multicultural group business people downtown toronto street",
            "graduate students throwing hats university of british columbia",
            "tech workers coding modern office montreal",
            "new immigrants airport welcome hug canada",
            "diverse startup team celebrating success canada",
            "asian family hiking banff national park summer",
            "canadian citizenship ceremony oath taking smiling",
            "international business professionals shaking hands toronto skyline background",
            "construction engineer looking at blueprints toronto condo",
            "healthcare workers canada hospital diverse team",
            "happy couple holding canadian flags city background"
        ]
        
        async with aiohttp.ClientSession() as session:
            for query in queries:
                logger.info(f"🔎 Processing: {query}")
                
                # 1. Try DuckDuckGo (Best Quality)
                ddg_urls = self.ddg.scrape(query, limit=10)
                if ddg_urls:
                    await self.download_and_save(session, ddg_urls, query, "ddg")
                
                # 2. Try Bing (Great Fallback)
                bing_urls = await self.bing.scrape(session, query, limit=10)
                if bing_urls:
                    await self.download_and_save(session, bing_urls, query, "bing")
                    
                # 3. Try Pinterest via Bing (Aesthetic/Mood)
                pin_urls = await self.pinterest.scrape(session, query, limit=10)
                if pin_urls:
                    await self.download_and_save(session, pin_urls, query, "pin")

                await asyncio.sleep(1) # Be nice

        # Re-generate manifest
        self.generate_manifest()

    def generate_manifest(self):
        files = list(OUTPUT_DIR.glob("*.jpg")) + list(OUTPUT_DIR.glob("*.png"))
        manifest = {}
        for f in files:
            manifest[f.name] = {"path": f"/assets/visionary/{f.name}", "size": f.stat().st_size}
        
        import json
        with open(MANIFEST_FILE, 'w') as f:
            json.dump(manifest, f, indent=2)
        logger.info("📄 Manifest updated")

if __name__ == "__main__":
    scraper = MultiEngineScraper()
    asyncio.run(scraper.run())
