"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  LinkIcon,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Handle formatting actions
  const handleFormat = (tag: string, openingTag?: string, closingTag?: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    // Save selection for later use
    setSelectionStart(start)
    setSelectionEnd(end)

    // If no text is selected and we're adding a link, open the dialog
    if (tag === "link" && start === end) {
      setLinkText("")
      setLinkUrl("")
      setShowLinkDialog(true)
      return
    }

    // If text is selected and we're adding a link, open the dialog with the selected text
    if (tag === "link" && start !== end) {
      setLinkText(selectedText)
      setLinkUrl("")
      setShowLinkDialog(true)
      return
    }

    // For other formatting, wrap the selected text with the appropriate tags
    const formattedText = openingTag + selectedText + closingTag
    const newValue = value.substring(0, start) + formattedText + value.substring(end)
    onChange(newValue)

    // Set focus back to textarea and restore selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + openingTag!.length, start + openingTag!.length + selectedText.length)
    }, 0)
  }

  // Handle link insertion
  const handleInsertLink = () => {
    if (!textareaRef.current) return

    const linkHtml = `<a href="${linkUrl}" target="_blank">${linkText || linkUrl}</a>`

    // If text was selected, replace it with the link
    if (selectionStart !== selectionEnd) {
      const newValue = value.substring(0, selectionStart) + linkHtml + value.substring(selectionEnd)
      onChange(newValue)
    } else {
      // Otherwise, insert the link at the cursor position
      const newValue = value.substring(0, selectionStart) + linkHtml + value.substring(selectionStart)
      onChange(newValue)
    }

    setShowLinkDialog(false)
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("bold", "<strong>", "</strong>")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("italic", "<em>", "</em>")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("underline", "<u>", "</u>")}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("h1", "<h1>", "</h1>")}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("h2", "<h2>", "</h2>")}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("ul", "<ul>\n  <li>", "</li>\n</ul>")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("ol", "<ol>\n  <li>", "</li>\n</ol>")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("left", '<div style="text-align: left;">', "</div>")}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("center", '<div style="text-align: center;">', "</div>")}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("right", '<div style="text-align: right;">', "</div>")}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat("link")} title="Insert Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter detailed product description..."
        className="min-h-[300px] border-0 focus-visible:ring-0 rounded-t-none"
      />

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link-text">Link Text</Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Enter link text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleInsertLink} disabled={!linkUrl}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

