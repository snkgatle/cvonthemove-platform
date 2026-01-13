
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

        # Add Experience
        page.get_by_role("button", name="Add Experience").click()
        page.wait_for_timeout(1000)

        # Check for button
        enhance_btn = page.locator("text=Enhance with AI")
        if enhance_btn.count() == 0:
            print("Enhance button still not found.")
        else:
            enhance_btn.first.click()

            # Wait for Modal
            page.wait_for_selector("text=AI Resume Enhancer")

            # Fill Textarea
            page.locator(".relative textarea").fill("I sold cars")

            # Click Enhance Button in Modal
            page.get_by_role("button", name="Enhance").click()

            # Wait for suggestions
            page.wait_for_selector("text=Suggestions:")

            # Select first suggestion
            first_suggestion_btn = page.locator("text=Use this").first
            first_suggestion_text = page.locator(".p-3 p").first.inner_text()

            first_suggestion_btn.click()

            # Wait for modal to close
            page.wait_for_timeout(500)

            # Verify text in main form
            main_textarea_val = page.locator("textarea[name='workExperiences.0.description']").input_value()

            print(f"Main form value: {main_textarea_val}")

            if first_suggestion_text == main_textarea_val:
                print("SUCCESS: Text updated correctly.")
            else:
                print("FAILURE: Text did not update correctly.")

        browser.close()

if __name__ == "__main__":
    verify_ai_enhancer()
