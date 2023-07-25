const adminSideBarMenu = [
  {
    title: "Dashboard",
    link: "dashboard",
    icon: <i className="bi bi-speedometer"></i>,
  },
  {
    title: "Users",
    link: "users",
    icon: <i className="bi bi-people"></i>,
  },
  {
    title: "Games",
    link: "games",
    icon: <i className="bi bi-controller"></i>,
  },
  {
    title: "Tournaments",
    link: "tours",
    icon: <i className="bi bi-trophy"></i>,
  },
  {
    title: "Rewards",
    link: "prizes",
    icon: <i className="bi bi-award"></i>,
  },
  {
    title: "Reports",
    link: "reports",
    icon: <i className="bi bi-envelope"></i>,
  },
  {
    title: "Configuration",
    link: "config",
    icon: <i className="bi bi-sliders"></i>,
  },
];

const str_stage = [
  {
    name: "countdown",
    label: "Countdown",
    type: "number",
    placeholder: "Type Countdown",
    autoFoucs: true,
  },
  {
    name: "min_player",
    label: "Minimum Players",
    type: "number",
    placeholder: "Type Minimum Players",
  },
  {
    name: "max_player",
    label: "Maximum Players",
    type: "number",
    placeholder: "Type Maximum Players",
  },
  {
    name: "buyin",
    label: "Buy in",
    type: "number",
    placeholder: "Type Buy in",
  },
  {
    name: "balance",
    label: "Start Balance",
    type: "number",
    placeholder: "Type Start Balance",
  },
  {
    name: "duration",
    label: "Duration",
    type: "number",
    placeholder: "Type the Number of Hours",
  },
];

const status = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

const str_prize = [
  { place: 1, advance: false, prizeType: "", value: "" },
  { place: 2, advance: false, prizeType: "", value: "" },
  { place: 3, advance: false, prizeType: "", value: "" },
  { place: 4, advance: false, prizeType: "", value: "" },
  { place: 5, advance: false, prizeType: "", value: "" },
  { place: 6, advance: false, prizeType: "", value: "" },
  { place: 7, advance: false, prizeType: "", value: "" },
  { place: 8, advance: false, prizeType: "", value: "" },
  { place: 9, advance: false, prizeType: "", value: "" },
  { place: 10, advance: false, prizeType: "", value: "" },
];

export { adminSideBarMenu, str_stage, status, str_prize };
