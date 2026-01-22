# Mobile Side Navigation CSS Documentation

## Overview

The mobile sidebar uses a **Sheet component** (a slide-out drawer) that appears on screens smaller than the `md` breakpoint (768px). The desktop sidebar is hidden on mobile, and the Sheet/drawer only appears via the `isMobile` hook check.

---

## Key Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `SIDEBAR_WIDTH_MOBILE` | `18rem` (288px) | Width of mobile sidebar |
| `SIDEBAR_WIDTH` | `16rem` (256px) | Width of desktop sidebar |
| `SIDEBAR_WIDTH_ICON` | `3rem` (48px) | Width when collapsed to icons |

---

## Mobile Sidebar Component

**File:** `resources/js/components/ui/sidebar.tsx` (Lines 169-201)

```tsx
if (isMobile) {
  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetHeader className="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <SheetContent
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE,  // "18rem"
        }}
        side={side}  // "left" or "right"
      >
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
```

### Mobile Sidebar Classes Explained:

| Class | CSS Effect |
|-------|------------|
| `bg-sidebar` | Background color from sidebar theme |
| `text-sidebar-foreground` | Text color from sidebar theme |
| `w-(--sidebar-width)` | Width set to CSS variable (18rem) |
| `p-0` | No padding |
| `[&>button]:hidden` | Hide close button inside |

---

## Sheet Content Component (Slide-in Drawer)

**File:** `resources/js/components/ui/sheet.tsx` (Lines 45-70)

```tsx
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // Base styles
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          
          // Right side
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          
          // Left side (typical mobile nav)
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          
          // Top side
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          
          // Bottom side
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="...">
          <XIcon className="size-4" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}
```

---

## Left Side Sheet CSS (Typical Mobile Nav)

```css
/* Base styles */
.sheet-content {
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition-timing-function: ease-in-out;
}

/* Left side specific */
.sheet-content[data-side="left"] {
  inset-block: 0;           /* top: 0; bottom: 0; */
  left: 0;
  height: 100%;
  width: 75%;               /* w-3/4 */
  border-right: 1px solid;
}

/* Animation - Opening */
.sheet-content[data-state="open"] {
  animation: slide-in-from-left;
  animation-duration: 500ms;
}

/* Animation - Closing */
.sheet-content[data-state="closed"] {
  animation: slide-out-to-left;
  animation-duration: 300ms;
}

/* Max width on sm+ screens (640px+) */
@media (min-width: 640px) {
  .sheet-content {
    max-width: 24rem;       /* sm:max-w-sm = 384px */
  }
}
```

---

## Overlay CSS

```css
.sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);  /* bg-black/80 */
}

/* Fade in animation */
.sheet-overlay[data-state="open"] {
  animation: fade-in;
  opacity: 1;
}

/* Fade out animation */
.sheet-overlay[data-state="closed"] {
  animation: fade-out;
  opacity: 0;
}
```

---

## Tailwind Classes Reference

### Base Sheet Content Classes:
| Tailwind Class | CSS Equivalent |
|----------------|----------------|
| `fixed` | `position: fixed` |
| `z-50` | `z-index: 50` |
| `flex` | `display: flex` |
| `flex-col` | `flex-direction: column` |
| `gap-4` | `gap: 1rem` |
| `shadow-lg` | Large box shadow |
| `transition` | Enable transitions |
| `ease-in-out` | Transition timing function |

### Left Side Specific Classes:
| Tailwind Class | CSS Equivalent |
|----------------|----------------|
| `inset-y-0` | `top: 0; bottom: 0` |
| `left-0` | `left: 0` |
| `h-full` | `height: 100%` |
| `w-3/4` | `width: 75%` |
| `border-r` | `border-right: 1px solid` |
| `sm:max-w-sm` | `max-width: 24rem` at 640px+ |

### Animation Classes:
| Tailwind Class | Effect |
|----------------|--------|
| `data-[state=open]:animate-in` | Animate when opening |
| `data-[state=closed]:animate-out` | Animate when closing |
| `data-[state=open]:slide-in-from-left` | Slide in from left |
| `data-[state=closed]:slide-out-to-left` | Slide out to left |
| `data-[state=open]:duration-500` | 500ms open duration |
| `data-[state=closed]:duration-300` | 300ms close duration |

---

## How Mobile Detection Works

**File:** `resources/js/hooks/use-mobile.ts`

The sidebar uses a custom hook to detect mobile screens:

```tsx
const isMobile = useIsMobile()  // Returns true if screen < md (768px)
```

When `isMobile` is `true`, the Sheet component renders instead of the fixed desktop sidebar.
