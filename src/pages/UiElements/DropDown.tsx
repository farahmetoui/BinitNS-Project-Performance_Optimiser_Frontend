import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type DropdownItem = {
  label: string
}

type DropdownBoxProps = {
  options: DropdownItem[]
  onSelect: (value: string) => void
  selected?: string // facultatif, pour afficher l'élément sélectionné
}

export default function DropdownBox({ options, onSelect, selected }: DropdownBoxProps) {
  return (
    <Menu as="div" className="relative inline-block text-left lg:w-55 ">
      <div>
        <MenuButton className="inline-flex w-full h-11 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          {selected || 'Select role'}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {options.map((item, index) => (
            <MenuItem key={index}>
              <button
                onClick={() => onSelect(item.label)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
