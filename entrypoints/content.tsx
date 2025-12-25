import ReactDOM, { Root } from "react-dom/client";
import ZenUI from "@/components/zen-ui";
import { ContentScriptContext } from "wxt/utils/content-script-context";
import { ShadowRootContentScriptUi } from "wxt/utils/content-script-ui/shadow-root";
import { storage } from "@wxt-dev/storage";

const whereToShowUI = [new MatchPattern("*://*.youtube.com/")];

let uiRef: ShadowRootContentScriptUi<Root> | null = null;

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  async main(ctx) {
    console.log("Hello content.");

    const zenModeStatus = await storage.getItem("local:zen-mode-status", {
      fallback: "not-activated",
    });

    if (zenModeStatus === "activated") {
      document.documentElement.style.setProperty(
        "--zen-mode-status",
        "activated"
      );

      ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
        if (!uiRef && checkIfWeCanInjectUI(newUrl.toString())) {
          await mounShadowRootUI(ctx);
        }
      });

      if (checkIfWeCanInjectUI(window.location.href)) {
        await mounShadowRootUI(ctx);
      }
    } else {
      document.documentElement.style.setProperty(
        "--zen-mode-status",
        "not-activated"
      );
    }
  },
});

async function mounShadowRootUI(ctx: ContentScriptContext) {
  uiRef = await createShadowRootUi(ctx, {
    name: "zen-mode-youtube",
    position: "inline",
    anchor: "body",
    onMount: (container) => {
      const app = document.createElement("div");
      container.append(app);

      const root = ReactDOM.createRoot(app);
      root.render(<ZenUI />);

      return root;
    },
    onRemove: (root) => {
      root?.unmount();
    },
  });

  uiRef?.mount();
}

function checkIfWeCanInjectUI(newUrl: string) {
  return whereToShowUI.some((pattern) => pattern.includes(newUrl));
}
