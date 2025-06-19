export function getBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "ongoing":
      return "ongoing";
    case "finished":
      return "default"; // You must define this variant in your Badge component if it's custom
    default:
      return "destructive";
  }
}
