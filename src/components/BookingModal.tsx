import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwXtlVfzBhhWjLy1EUdv2Fya5oTdW5mze6pAUAYsWK4J8-BYGq6xhllan-01qUWvemmkw/exec";

const referralSources = [
  "Google Search",
  "Facebook",
  "Instagram",
  "YouTube",
  "Friend / Family",
  "WhatsApp",
  "Temple Visit",
  "Newspaper / Magazine",
  "Other",
];

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tourPackage?: string;
  tourDetails?: string;
}

const BookingModal = ({
  isOpen,
  onOpenChange,
  tourPackage,
  tourDetails,
}: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "1",
    preferredDate: "",
    specialRequests: "",

    // 👇 added internally (NO breaking change)
    referralSource: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, referralSource: value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      travelers: "1",
      preferredDate: "",
      specialRequests: "",
      referralSource: "",
    });
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      travelers: formData.travelers,
      preferredDate: formData.preferredDate,

      // 👇 mapped cleanly
      address: formData.specialRequests || "Not Provided",
      referralSource: formData.referralSource || "Website",
      tourPackage: tourPackage || "General Inquiry",
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);

      toast.success(
        `🎉 Booking request sent for ${tourPackage || "your trip"}`
      );

      setTimeout(() => {
        onOpenChange(false);
        resetForm();
      }, 2500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) resetForm();
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl">
        <div className="px-6 pt-6 pb-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Book Your Pilgrimage
            </DialogTitle>
            {(tourPackage || tourDetails) && (
              <DialogDescription>
                {tourPackage}{" "}
                {tourDetails && <span>- {tourDetails}</span>}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center py-10 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold">Request Submitted!</h3>
            <p className="text-center text-muted-foreground">
              We’ll contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone + Travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone *</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Travellers *</Label>
                <Input
                  type="number"
                  min="1"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label>Preferred Date</Label>
              <Input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>

            {/* Address (mapped from specialRequests) */}
            <div>
              <Label>Address / Notes *</Label>
              <Textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                required
                placeholder="Enter address or special requests"
              />
            </div>

            {/* Referral Source */}
            <div>
              <Label>How did you hear about us? *</Label>
              <Select
                value={formData.referralSource}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {referralSources.map((src) => (
                    <SelectItem key={src} value={src}>
                      {src}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-hero text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;