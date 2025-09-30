#!/usr/bin/env python3
"""
Web Screenshot Tool using Selenium
Captures full-page screenshots for testing and documentation
"""

import os
import time
import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_chrome_driver():
    """Setup Chrome driver with optimal settings for screenshots"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-extensions")
    
    return webdriver.Chrome(options=chrome_options)

def capture_screenshot(url, output_path, wait_time=3):
    """Capture full-page screenshot of given URL"""
    driver = None
    try:
        driver = setup_chrome_driver()
        logger.info(f"Navigating to {url}")
        
        driver.get(url)
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Additional wait for dynamic content
        time.sleep(wait_time)
        
        # Get full page height
        total_height = driver.execute_script("return document.body.scrollHeight")
        driver.set_window_size(1920, total_height)
        
        # Take screenshot
        driver.save_screenshot(output_path)
        logger.info(f"Screenshot saved to {output_path}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error capturing screenshot: {e}")
        return False
        
    finally:
        if driver:
            driver.quit()

if __name__ == "__main__":
    # Example usage
    url = "http://localhost:3000"
    output_path = "navbar-screenshot.png"
    
    success = capture_screenshot(url, output_path)
    if success:
        print(f"✅ Screenshot captured successfully: {output_path}")
    else:
        print("❌ Failed to capture screenshot")
