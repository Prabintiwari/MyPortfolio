// src/routes/index.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import Skills from "../pages/admin/Skills";
import Experiences from "../pages/admin/Experiences";
import Services from "../pages/admin/Services";
import Contacts from "../pages/admin/Contacts";
import About from "../pages/admin/About";
import Portfolio from "../pages/admin/Portfolio";
import Settings from "../pages/admin/Settings";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import ContactMethods from "../pages/admin/ContactMethod";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
      {
        path: "experiences",
        element: <Experiences />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "contact-Methods",
        element: <ContactMethods />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-8">Page not found</p>
          <a
            href="/admin/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    ),
  },
]);
