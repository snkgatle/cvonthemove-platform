
from playwright.sync_api import sync_playwright

def verify_ai_enhancer():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 1. Set Token
        page.goto("http://localhost:5173/")
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTc2ODI1MDA1N30.N5eCsD448sRzQWwvvwbrw66n9NWF2jwwmQFK39kzswI"
        page.evaluate(f"localStorage.setItem('token', '{token}')")

        # 2. Go to /create
        page.goto("http://localhost:5173/create")
        page.wait_for_timeout(3000)

        page.screenshot(path="verification/debug_state.png")

        # Check if Add Experience button exists
        if page.get_by_role("button", name="Add Experience").count() == 0:
            print("Add Experience button not found")
        else:
             page.get_by_role("button", name="Add Experience").click()
             page.wait_for_timeout(1000)

             if page.get_by_text("Enhance with AI").count() == 0:
                 print("Enhance button not found")
                 page.screenshot(path="verification/debug_no_enhance.png")
             else:
                 print("Enhance button found")

        browser.close()

if __name__ == "__main__":
    verify_ai_enhancer()
