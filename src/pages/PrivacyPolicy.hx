package pages;

import Html.*;
import Html.Markup.*;

class PrivacyPolicy {
	public static function render():Html {
		return Layout.page("Privacy Policy", raw(Io.read("res/privacy-policy.html")));
	}
}
