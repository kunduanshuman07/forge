import { createBrowserRouter } from "react-router-dom";

import LandingPage from "@/pages/Landing/LandingPage";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { AppLayout } from "@/components/layout/AppLayout";
import ProjectsPage from "@/pages/Projects/ProjectsPage";
import ProjectDetailsPage from "@/pages/Projects/ProjectDetailsPage";
import BugDetailsPage from "@/pages/Bug/BugDetailsPage";
import WorkspacePage from "@/pages/Workspace/WorkspacePage";
import SubmissionsPage from "@/pages/Submissions/SubmissionsPage";
import SubmissionDetailsPage from "@/pages/Submissions/SubmissionDetailsPage";
import AdminDashboardPage from "@/pages/Admin/AdminDashboardPage";
import AdminProjectsPage from "@/pages/Admin/AdminProjectsPage";
import AdminRoute from "./AdminRoute";
import AdminProjectDetailsPage from "@/pages/Admin/AdminProjectDetailPage";
import AdminBugDetailsPage from "@/pages/Admin/AdminBugDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectDetailsPage />,
      },
      {
        path: "/bugs/:bugId",
        element: <BugDetailsPage />,
      },
      {
        path: "/workspace",
        element: <WorkspacePage />,
      },
      {
        path: "/submissions",
        element: <SubmissionsPage />,
      },
      {
        path: "/submissions/:submissionId",
        element: <SubmissionDetailsPage />,
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboardPage />,
          },
          {
            path: "/admin/projects",
            element: <AdminProjectsPage />,
          },
          {
            path: "/admin/projects/:projectId",
            element: <AdminProjectDetailsPage />,
          },
          {
            path: "/admin/bugs/:bugId",
            element: <AdminBugDetailsPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);