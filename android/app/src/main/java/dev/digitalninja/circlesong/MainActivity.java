package dev.digitalninja.circlesong;

import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.android.R;

/**
 * The web app, plus the three things it cannot do for itself from inside a
 * WebView: find out where the system bars are, say which way round to draw
 * them, and find out that it has been put in the background.
 */
public class MainActivity extends BridgeActivity {

    /** The bridge the page talks to. Its methods run on the WebView thread. */
    private final Shell shell = new Shell();

    /** The latest measurement, in CSS pixels, as "top,right,bottom,left". */
    private volatile String insets = "0,0,0,0";

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
            web.addJavascriptInterface(shell, "CircleSongInsets");

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
                insets = (bars.top / density) + "," + (bars.right / density) + ","
                       + (bars.bottom / density) + "," + (bars.left / density);
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

    /** What the page can ask of the shell. Called from the WebView thread. */
    public class Shell {

        /** The system-bar insets, in CSS pixels: "top,right,bottom,left". */
        @JavascriptInterface
        public String get() {
            return insets;
        }

        /**
         * Which way round to draw the clock, the battery and the gesture bar.
         *
         * The app paints its own background behind both system bars, and that
         * background is the in-app theme's, chosen at runtime — so Light and
         * Sepia put white icons on a white bar unless something says
         * otherwise. A theme is a page decision and this is the only way to
         * act on it: the alternative, switching the activity's night mode,
         * recreates the activity and reloads the app.
         *
         * @param lightBars true when the bars are sitting on a light
         *                  background and their contents should be dark.
         */
        @JavascriptInterface
        public void setLightSystemBars(boolean lightBars) {
            runOnUiThread(() -> {
                WebView web = findViewById(R.id.webview);
                if (web == null) return;
                WindowInsetsControllerCompat bars =
                    WindowCompat.getInsetsController(getWindow(), web);
                bars.setAppearanceLightStatusBars(lightBars);
                bars.setAppearanceLightNavigationBars(lightBars);
            });
        }
    }
}
