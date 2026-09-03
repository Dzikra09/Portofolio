// Route /projects dihapus — konten sudah dipindah ke single-page di app/page.tsx (section #projects)
import { redirect } from "next/navigation";

export default function ProjectsRedirect() {
  redirect("/#projects");
}
