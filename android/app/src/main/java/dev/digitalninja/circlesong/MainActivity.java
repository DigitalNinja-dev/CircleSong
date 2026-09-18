package dev.digitalninja.circlesong;

import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.android.R;

/**
 * The web app, plus the two things it cannot do for itself from inside a
 * WebView: find out where the system bars are, and find out that it has been
 * put in the background.
 */
public class MainActivity extends BridgeActivity {

    /** The latest measurement, in CSS pixels. Read from the WebView thread. */
    private final SystemInsets insets = new SystemInsets();

    /**
     * Capacitor lays the WebView out in {@code onCreate} and then starts
     * loading the page from {@code load()}. Overriding {@code load()} is the
     * one point where the view exists but the first document does not, which
     * is what {@code addJavascriptInterface} requires: an object added after a
     * document has started loading is not visible to it.
     */
    @Override
    protected void load() {
        WebView web = findViewById(R.id.webview);
        if (web != null) {
            web.addJavascriptInterface(insets, "CircleSongInsets");

            // From targetSdk 35 the window is edge-to-edge and there is no way
            // to opt out, so the page is drawn underneath the status bar and
            // the navigation bar. CSS env(safe-area-inset-*) does not rescue
            // it: Android's WebView fills those in from the display cutout
            // only, and a status bar is not a cutout. So the insets are
            // measured here and the page is told to re-read them.
            ViewCompat.setOnApplyWindowInsetsListener(web, (view, windowInsets) -> {
                Insets bars = windowInsets.getInsets(
                    WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
                );
                float density = view.getResources().getDisplayMetrics().density;
                insets.set(bars.top / density, bars.right / density,
                           bars.bottom / density, bars.left / density);
                // A no-op before the page exists; the page reads the values
                // itself on boot, so nothing depends on this arriving.
                web.evaluateJavascript(
                    "window.dispatchEvent(new Event('circlesong:insets'))", null
                );
                // Returned unconsumed: nothing else here wants them, but
                // consuming them would be a lie to any view added later.
                return windowInsets;
            });
        }
        super.load();
    }

    /**
     * Capacitor's own onPause only notifies plugins — it never pauses the
     * WebView — so a minimised app carries on running: the sequencer keeps
     * queueing bars and the audio worklet keeps rendering, which is heard as
     * an app that is still making noise after it has been put away. The page
     * stops its own audio on visibilitychange; this is what guarantees that
     * event is delivered, because WebView.onPause is what marks the document
     * hidden. It does not pause JavaScript, so the handler still runs.
     */
    @Override
    public void onPause() {
        super.onPause();
        WebView web = findViewById(R.id.webview);
        if (web != null) web.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        WebView web = findViewById(R.id.webview);
        if (web != null) web.onResume();
    }

    /** Four numbers, in CSS pixels, readable from the page as a string. */
    public static class SystemInsets {
        private volatile String value = "0,0,0,0";

        void set(float top, float right, float bottom, float left) {
            value = top + "," + right + "," + bottom + "," + left;
        }

        @JavascriptInterface
        public String get() {
            return value;
        }
    }
}
