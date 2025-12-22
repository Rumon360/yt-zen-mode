import ReactDOM from "react-dom/client";
import ZenUI from "@/components/zen-ui";

export default defineContentScript({
  matches: ["*://*.google.com/*"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  async main(ctx) {
    console.log("Hello content.");

    const ui = await createShadowRootUi(ctx, {
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

    ui?.mount();
  },
});
