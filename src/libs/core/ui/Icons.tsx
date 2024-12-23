import React from 'react';
import * as Fi from 'react-icons/fi';
import * as Ri from "react-icons/ri";
import * as Rx from "react-icons/rx";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Fa6 from "react-icons/fa6";

const OutbuildLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 42 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.585 20.0017H40.2974C41.0912 17.7388 41.3337 15.3177 41.0046 12.9412C40.6755 10.5647 39.7844 8.3021 38.406 6.34312C37.0276 4.38414 35.202 2.78583 33.0824 1.68217C30.9627 0.578514 28.6107 0.00167293 26.2235 0H11.5692V9.9982H29.585V20.0017Z"
        fill="currentColor"
      />
      <path
        d="M29.5836 20.0015H11.5678V9.99805H0.860694C0.0607553 12.2605 -0.186547 14.683 0.13961 17.0616C0.465767 19.4401 1.35583 21.7051 2.73484 23.6657C4.11385 25.6263 5.94142 27.225 8.06361 28.3273C10.1858 29.4297 12.5405 30.0032 14.9293 29.9997H29.5836V20.0015Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type IconName = keyof typeof Icons;

export const Icons = {
  Sales: 'Sales',
  Gamging: 'Gaming',
  Sports: 'Sports',
  Board: 'Board',
  Checkbox: 'Checkbox',
  Drag: 'Drag',
  Design: 'Design',
  Development: 'Development',
  Edit: 'Edit',
  Eye: 'Eye',
  Fire: 'Fire',
  Home: 'Home',
  Logout: 'Logout',
  Minus: 'Minus',
  More: 'More',
  Move: 'Move',
  Next: 'Next',
  Outbuild: 'Outbuild',
  Plus: 'Plus',
  Prev: 'Prev',
  Pencil: 'Pencil',
  Projects: 'Projects',
  Remove: 'Remove',
  Square: 'Square',
  Users: 'Users',
  X: 'X',
} as const;

export const IconsMap = {
  [Icons.Sales]: Ri.RiFundsBoxLine,
  [Icons.Gamging]: Md.MdSportsEsports,
  [Icons.Sports]: Md.MdSportsFootball,
  [Icons.Board]: Fa.FaTrello,
  [Icons.Checkbox]: Fi.FiCheckSquare,
  [Icons.Drag]: Rx.RxDragHandleDots2,
  [Icons.Design]: Md.MdOutlineDesignServices,
  [Icons.Development]: Fa6.FaLaptopCode,
  [Icons.Eye]: Fi.FiEye,
  [Icons.Edit]: Fi.FiEdit,
  [Icons.Fire]: Ri.RiFireLine,
  [Icons.Home]: Ri.RiHome4Line,
  [Icons.Logout]: Fi.FiLogOut,
  [Icons.Minus]: Fi.FiMinus,
  [Icons.More]: Fi.FiMoreHorizontal,
  [Icons.Move]: Fi.FiMove,
  [Icons.Next]: Fi.FiChevronRight,
  [Icons.Outbuild]: OutbuildLogo,
  [Icons.Plus]: Fi.FiPlus,
  [Icons.Prev]: Fi.FiChevronLeft,
  [Icons.Pencil]: Fi.FiEdit3,
  [Icons.Projects]: Md.MdOutlineFeaturedPlayList,
  [Icons.Remove]: Fi.FiTrash2,
  [Icons.Square]: Fi.FiSquare,
  [Icons.Users]: Fi.FiUsers,
  [Icons.X]: Fi.FiX,
} as const;

export const randomIcon = () => {
  const values = Object.values(Icons);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
