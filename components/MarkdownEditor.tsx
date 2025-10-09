"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
}: MarkdownEditorProps) {
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  const insertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);

    onChange(newValue);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      // Create unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName; // Only filename, not full path

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      // Insert markdown image syntax
      insertText(`![${file.name}](${data.publicUrl})`);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const toolbarButtons = [
    {
      label: "Bold",
      icon: "B",
      action: () => insertText("**bold text**"),
    },
    {
      label: "Italic",
      icon: "I",
      action: () => insertText("*italic text*"),
    },
    {
      label: "Code",
      icon: "</>",
      action: () => insertText("`code`"),
    },
    {
      label: "Link",
      icon: "🔗",
      action: () => insertText("[link text](https://example.com)"),
    },
    {
      label: "Image",
      icon: "🖼️",
      action: () => document.getElementById("image-upload")?.click(),
    },
    {
      label: "Heading 1",
      icon: "H1",
      action: () => insertText("# Heading 1"),
    },
    {
      label: "Heading 2",
      icon: "H2",
      action: () => insertText("## Heading 2"),
    },
    {
      label: "List",
      icon: "•",
      action: () => insertText("- List item"),
    },
    {
      label: "Quote",
      icon: '"',
      action: () => insertText("> Quote text"),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">Content (Markdown)</label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{value.length} characters</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-slate-800/50 rounded-lg border border-primary/20">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            disabled={uploading}
            className="px-3 py-1.5 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={15}
        className="w-full px-4 py-3 bg-slate-700 border border-primary/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 font-mono text-sm resize-none"
      />

      {/* Hidden file input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview */}
      {value && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Preview</label>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-primary/20 max-h-64 overflow-y-auto">
            <div
              className="prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: value
                  .replace(/\n\n/g, "</p><p>")
                  .replace(/^/, "<p>")
                  .replace(/$/, "</p>")
                  .replace(/#{1,6}\s+(.+)/g, (match, title) => {
                    const matches = match.match(/^#+/);
                    const level = matches ? matches[0].length : 1;
                    return `<h${level} class="text-white font-bold mt-4 mb-2">${title}</h${level}>`;
                  })
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em class="text-slate-200">$1</em>')
                  .replace(
                    /`(.+?)`/g,
                    '<code class="bg-slate-700 px-1 py-0.5 rounded text-accent-400">$1</code>'
                  )
                  .replace(
                    /!\[(.+?)\]\((.+?)\)/g,
                    '<div class="flex justify-center my-4"><img src="$2" alt="$1" class="max-w-lg w-full h-auto rounded border border-primary/20" onerror="this.style.display=\'none\'" /></div>'
                  )
                  .replace(
                    /\[(.+?)\]\((.+?)\)/g,
                    '<a href="$2" class="text-accent-400 hover:text-accent-300">$1</a>'
                  )
                  .replace(/^- (.+)/gm, '<li class="text-slate-300">$1</li>')
                  .replace(/(<li.*?<\/li>)/g, '<ul class="list-disc list-inside space-y-1">$1</ul>')
                  .replace(
                    /^> (.+)/gm,
                    '<blockquote class="border-l-4 border-accent-600 pl-4 italic text-slate-300">$1</blockquote>'
                  ),
              }}
            />
          </div>
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Uploading image...
        </div>
      )}
    </div>
  );
}
