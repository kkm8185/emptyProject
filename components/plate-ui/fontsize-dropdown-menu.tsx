import React from "react"
import { setMarks, setNodes } from "@udecode/plate-common"
import { useEditorRef, useSelectionFragmentProp } from "@udecode/plate-common/react"

import { FONT_SIZE_OPTIONS } from "@/lib/constants"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu"
import { ToolbarButton } from "./toolbar"

const focusEditor = (editor: any) => {
  editor.selection = { ...editor.selection }
  editor.onChange()
}

export function FontSizeDropdownMenu(props: any) {
  const editor = useEditorRef()
  const openState = useOpenState()
  const value = useSelectionFragmentProp({
    defaultValue: "12",
    getProp: (node: any) => {
      return String(node.children[0]?.fontSize) || "12"
    },
  })

  const selectedItem = React.useMemo(() => {
    return FONT_SIZE_OPTIONS.find((item) => item.value === String(value)) ?? FONT_SIZE_OPTIONS[3]
  }, [value])

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Font Size" isDropdown>
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ignore-click-outside/toolbar min-w-0" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(fontSize) => {
            setMarks(editor, { fontSize: Number(fontSize) })
            focusEditor(editor)
          }}
          label="Font Size"
        >
          {FONT_SIZE_OPTIONS.map(({ label, value: itemValue }) => (
            <DropdownMenuRadioItem key={itemValue} className="min-w-[180px]" value={itemValue}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
