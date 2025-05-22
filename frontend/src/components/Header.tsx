import { NavLink, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Role } from "@/types";
import { useAuth } from "@/api/AuthApi";

const Header = () => {
  const { currentUser } = useAuth();
  const isPatient = currentUser?.role === Role.PATIENT;
  const location = useLocation();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold tracking-tighter">MediPredict</h1>
      {currentUser ? (
        <div className="flex space-x-5">
          {isPatient ? (
            <>
              <NavLink
                to="/patient/prediction/form"
                className={() =>
                  location.pathname.search("prediction") !== -1
                    ? "bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                    : "text-white hover:text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg border-2"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/patient/search/doctors"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                    : "text-white hover:text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg border-2 "
                }
              >
                All Doctors
              </NavLink>
              <NavLink
                to="/patient/chat"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                    : "text-white hover:text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg border-2 "
                }
              >
                Chat With Doc
              </NavLink>
              <UserMenu />
            </>
          ) : (
            <>
              <NavLink
                to="/doctor/chat"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                    : "text-white hover:text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg border-2"
                }
              >
                Chat with patient
              </NavLink>
              <UserMenu />
            </>
          )}
        </div>
      ) : (
        <div className="flex space-x-5">
          <NavLink
            to="/patient/login"
            className={() =>
              location.pathname.startsWith("/patient")
                ? "bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                : "text-white hover:text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg border-2 "
            }
          >
            For Patients
          </NavLink>
          <NavLink
            to="/doctor/login"
            className={() =>
              location.pathname.startsWith("/doctor")
                ? "bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                : "text-white hover:text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg border-2 "
            }
          >
            For Doctors
          </NavLink>
        </div>
      )}
    </div>
  );
};
export { Header };
