
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
        page.wait_for_timeout(3000) # wait for load

        # 3. Open Work Experience Section if needed
        # Assuming we are on step 1 and Work Experience is visible or scrollable.

        # Add Experience
        # Using force=True to ensure we click even if overlaid or something
        page.get_by_role("button", name="Add Experience").click()
        page.wait_for_timeout(500)

        # Click Enhance with AI
        # It's a text button: "Enhance with AI"
        page.get_by_text("Enhance with AI").first.click()

        # Wait for Modal
        page.wait_for_selector("text=AI Resume Enhancer")

        # Fill Textarea
        # The modal has a textarea
        page.locator(".relative textarea").fill("I sold cars")

        # Click Enhance Button in Modal
        page.get_by_role("button", name="Enhance").click()

        # Wait for suggestions
        page.wait_for_selector("text=Suggestions:")

        # Take screenshot of suggestions
        page.screenshot(path="verification/ai_suggestions.png")
        print("Captured suggestions screenshot")

        # Select first suggestion
        # "Use this" button
        first_suggestion_btn = page.locator("text=Use this").first
        first_suggestion_text = page.locator(".p-3 p").first.inner_text()
        print(f"Selecting suggestion: {first_suggestion_text}")

        first_suggestion_btn.click()

        # Wait for modal to close
        page.wait_for_timeout(500)

        # Verify text in main form
        # The textarea in main form should now have the suggested text
        main_textarea_val = page.locator("textarea[name='workExperiences.0.description']").input_value()

        print(f"Main form value: {main_textarea_val}")

        if first_suggestion_text == main_textarea_val:
            print("SUCCESS: Text updated correctly.")
        else:
            print("FAILURE: Text did not update correctly.")

        page.screenshot(path="verification/final_state.png")

        browser.close()

if __name__ == "__main__":
    verify_ai_enhancer()
