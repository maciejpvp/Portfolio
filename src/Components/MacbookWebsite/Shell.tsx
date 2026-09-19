import { useState } from "react";

import { Header } from "./Header";
import { Nav, type TabId } from "./Nav";
import { AboutPanel } from "./panels/AboutPanel";
import { ContactPanel } from "./panels/ContactPanel";
import { StackPanel } from "./panels/StackPanel";
import { WorkPanel } from "./panels/WorkPanel";
import { usePanelOverflow } from "./usePanelOverflow";

const PANELS: Record<TabId, () => React.ReactElement> = {
  About: AboutPanel,
  Work: WorkPanel,
  Stack: StackPanel,
  Contact: ContactPanel,
};

export const Shell = ({ defaultTab = "About" }: { defaultTab?: TabId }) => {
  const [active, setActive] = useState<TabId>(defaultTab);
  const Panel = PANELS[active];

  return (
    <div className="bg-background text-foreground flex h-full w-full flex-col px-16 pt-10 pb-12">
      <Header />
      <div className="mt-8 shrink-0">
        <Nav active={active} onChange={setActive} />
      </div>
      <div
        key={active}
        className="motion-safe:animate-in motion-safe:fade-in mt-10 flex min-h-0 flex-1 flex-col duration-200"
      >
        <PanelBody tab={active}>
          <Panel />
        </PanelBody>
      </div>
    </div>
  );
};

const PanelBody = ({
  tab,
  children,
}: {
  tab: TabId;
  children: React.ReactNode;
}) => {
  const { ref, overflowing, atBottom } = usePanelOverflow(tab);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
        className="screen-scroll min-h-0 flex-1 overflow-y-auto focus-visible:outline-none"
        style={{ overscrollBehavior: "contain" }}
      >
        {children}
      </div>

      {overflowing && !atBottom && (
        <div
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t to-transparent"
        >
          <span className="text-label text-muted-foreground font-medium">
            more ↓
          </span>
        </div>
      )}
    </div>
  );
};
