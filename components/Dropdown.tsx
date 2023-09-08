import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Dropdown: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
}> = ({ trigger, children }) => {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="outline-none">
          {trigger}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="z-50 mt-4 flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-2 text-neutral-300">
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default Dropdown;
