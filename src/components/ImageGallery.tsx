import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  missionName: string;
}

export const ImageGallery = ({ images, missionName }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-48 rounded-lg overflow-hidden cursor-pointer cosmic-glow transition-smooth hover:scale-105 group"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image}
              alt={`${missionName} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-smooth group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
              <span className="text-primary font-medium">View Full Size</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 bg-background/95 border-primary/20">
          <div className="relative">
            <img
              src={selectedIndex !== null ? images[selectedIndex] : ""}
              alt={`${missionName} - Full size`}
              className="w-full h-auto"
            />
            
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full">
              <span className="text-sm text-foreground">
                {selectedIndex !== null ? selectedIndex + 1 : 0} / {images.length}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
