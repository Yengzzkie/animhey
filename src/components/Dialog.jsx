import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function Modal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="bg-[#141414]">
        <DialogHeader className="text-white">
          Hello fellow anime lovers!
        </DialogHeader>
        <DialogBody className="text-white">
          <p>
            We are currently experiencing server issues causing anime titles to
            not load properly. The issue is being addressed.
          </p>
          <br />
          <p>
            In the meantime, please try searching for your favorite anime title
            manually using the search bar.
          </p>
          <br />
          <p className="text-right">- Yengzzkie DzignTech</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
