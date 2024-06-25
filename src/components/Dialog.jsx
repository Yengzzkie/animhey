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
      <Dialog open={open} handler={handleOpen} className="bg-[#141414] ">
        <DialogHeader className="text-white">Hello fellow anime lovers!</DialogHeader>
        <DialogBody className="text-white">
          <p>
            Search function is now available to make finding your favorite anime
            easier. More features are coming soon!
          </p>
          <br />
          <p>
              Got suggestions? Send an email to <a href="mailto:gatchalian.manuel@gmail.com">
                 <span className="font-semibold">gatchalian.manuel@gmail.com</span>
              </a>
              . Enjoy!
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
