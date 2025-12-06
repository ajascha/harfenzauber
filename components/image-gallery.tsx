"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";

type ImageItem = {
  name: string;
  publicUrl: string;
  createdAt: string;
};

type ImageGalleryProps = {
  currentImageUrl: string | null;
  onSelectImage: (url: string) => void;
  onUploadComplete: (url: string) => void;
};

export function ImageGallery({
  currentImageUrl,
  onSelectImage,
  onUploadComplete,
}: ImageGalleryProps) {
  const [images, setImages] = React.useState<ImageItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(
    currentImageUrl
  );

  React.useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("/api/images");
        const json = await res.json();
        if (res.ok) {
          setImages(json.images || []);
        }
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to load images", e);
        }
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  async function handleFile(file: File) {
    try {
      setUploading(true);
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      
      const newImage = {
        name: json.key,
        publicUrl: json.publicUrl,
        createdAt: new Date().toISOString(),
      };
      setImages((prev) => [newImage, ...prev]);
      setSelectedUrl(json.publicUrl);
      onUploadComplete(json.publicUrl);
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
      alert("Upload fehlgeschlagen: " + (e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  function handleSelect(url: string) {
    setSelectedUrl(url);
    onSelectImage(url);
  }

  return (
    <Tabs defaultValue="gallery" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="gallery">Aus Galerie wählen</TabsTrigger>
        <TabsTrigger value="upload">Neues Bild hochladen</TabsTrigger>
      </TabsList>

      <TabsContent value="gallery" className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-500" />
          </div>
        ) : images.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-8">
            Noch keine Bilder vorhanden
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {images.map((img) => (
              <button
                key={img.name}
                type="button"
                onClick={() => handleSelect(img.publicUrl)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  selectedUrl === img.publicUrl
                    ? "border-primary ring-2 ring-primary"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <Image
                  src={img.publicUrl}
                  alt={img.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 150px"
                />
                {selectedUrl === img.publicUrl && (
                  <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="upload" className="space-y-4">
        <div className="flex flex-col gap-3">
          <Input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
            disabled={uploading}
          />
          {uploading && (
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Lade hoch…</span>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

