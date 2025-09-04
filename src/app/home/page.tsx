import ScrollEffect from '../components/ScroolEffect/scroll'
import { FloatingDock } from '../components/ui/floating-dock'
import { RiHome9Fill } from "react-icons/ri"
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-400 to-fuchsia-400">
      <ScrollEffect />
      <FloatingDock
        items={[
          { title: "Home", icon: <RiHome9Fill />, href: "/" },
          { title: "Search", icon: <BiSearchAlt />, href: "/" },
          { title: "Post", icon: <IoIosAddCircleOutline />, href: "/" },
          { title: "Notification", icon: <MdNotificationsActive />, href: "/" },
          { title: "Profile", icon: <CgProfile />, href: "/" },
        ]}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />
    </main>
  );
}
