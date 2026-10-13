package pages;

import Html.*;

class PrivacyPolicy {
	public static function render():Html {
		return Layout.page("Privacy Policy", raw(sys.io.File.getContent("res/privacy-policy.html")));
	}
}
