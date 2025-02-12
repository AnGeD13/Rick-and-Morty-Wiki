export default function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "alive":
      return "alive";
    case "dead":
      return "dead";
    case "unknown":
      return "unknown";
    default:
      break;
  }
};