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
          <p className="text-green-400 italic">
            Public chatroom is also added, to utilize it you have to enter your
            desired display name. This display name is tied to your device. If you
            decide to access <span className="font-bold text-yellow-400">Anim</span><span className="font-bold text-red-500">Hey!</span> from another device, you will be asked again
            to enter your display name.
          </p>
          <br />
          <p className="font-bold">Check it out at the bottom of the page!</p>
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
