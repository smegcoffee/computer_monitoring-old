import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  Autocomplete,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import Header from "../../Dashboard/Header";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

function Branch() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [department, setDepartment] = useState({ departments: [] });
  const [branchcode, setBranchcode] = useState({ branches: [] });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);
  const [branch, setBranch] = useState({
    branch_name: "",
    department_id: "",
    branch_code_id: "",
  });

  useEffect(() => {
    const fetchBrancheCode = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get("/api/branches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBranchcode(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchBrancheCode();
  }, []);
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get("/api/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchDepartment();
  }, []);

  const Department =
    department.departments && department.departments.length > 0
      ? department.departments.map((department) => ({
          id: department.id,
          department_name: department.department_name,
        }))
      : [];

  const Branchcode =
    branchcode.branches && branchcode.branches.length > 0
      ? branchcode.branches.map((branch) => ({
          id: branch.id,
          branch_name: branch.branch_name,
        }))
      : [];

  const handleSubmitBranch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        "api/add-branchsetup",
        {
          branch_name: branch.branch_name,
          department_id: branch.department_id,
          branch_code_id: branch.branch_code_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "green",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2500,
          timerProgressBar: true,
        });
        (async () => {
          await Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })();
        setBranch({
          branch_name: "",
          branch_code_id: "",
          department_id: "",
        });
        setValidationErrors("");
      }
      console.log("Adding branch:", response.data);
    } catch (error) {
      console.error("Error in adding branch:", error);
      if (error.response && error.response.data) {
        console.log("Backend error response:", error.response.data);
        setValidationErrors(error.response.data.errors || {});
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "red",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2500,
          timerProgressBar: true,
        });
        (async () => {
          await Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
        })();
      } else {
        console.log("ERROR!");
      }
    } finally {
      setLoading(false);
      setIsRefresh(false);
    }
  };

  const title = "Setup Branch";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header
        isRefresh={isRefresh}
        toggleSidebar={toggleSidebar}
        title={title}
      />
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div style={{ flex: 2, paddingBottom: "50px" }}>
          <p className="pt-10 ml-10 text-2xl font-normal">Setup Branch</p>
          <div className="mt-2 ml-10">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                path
                to="/dashboard"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
              >
                <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Setup
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.primary"
              >
                <GroupAddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Setup Branch
              </Typography>
            </Breadcrumbs>
          </div>
          <br /> <br />
          <div className="flex-none mt-10">
            <Container>
              <form onSubmit={handleSubmitBranch}>
                <Card>
                  <h2 className="flex items-center justify-center p-5 text-2xl font-semibold bg-blue-200">
                    SET UP BRANCH
                  </h2>
                  <CardContent>
                    <Grid container spacing={3} className="p-5">
                      {/* First Row */}
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          value={branch.branch_name}
                          onChange={(e) =>
                            setBranch({ ...branch, branch_name: e.target.value })
                          }
                          id="branch"
                          label="Branch"
                          variant="standard"
                          style={{ width: "100%" }}
                        />
                        <div className="mt-1 text-center text-red-500">
                          {validationErrors.branch_name &&
                            validationErrors.branch_name.map((error, index) => (
                              <div key={index}>{error}</div>
                            ))}
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Autocomplete
                          freeSolo
                          id="branch_code_id"
                          disableClearable
                          readOnly={Branchcode.length === 0}
                          options={Branchcode}
                          getOptionLabel={(option) => option.branch_name || ""}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={
                                Branchcode.length === 0
                                  ? "No branch code added yet"
                                  : "Branch Code"
                              }
                              variant="standard"
                              style={{ width: "100%" }}
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                            />
                          )}
                          value={
                            Branchcode.find(
                              (option) => option.id === branch.branch_code_id
                            ) || {}
                          }
                          onChange={(event, newValue) =>
                            setBranch({ ...branch, branch_code_id: newValue.id })
                          }
                        />
                        <div className="mt-1 text-center text-red-500">
                          {validationErrors.branch_code_id &&
                            validationErrors.branch_code_id.map((error, index) => (
                              <div key={index}>{error}</div>
                            ))}
                        </div>
                      </Grid>
                      {branch.branch_code_id === 1 && (
                        <Grid item xs={12} sm={12} md={12}>
                          <Autocomplete
                            freeSolo
                            id="department"
                            disableClearable
                            options={Department}
                            readOnly={Department.length === 0}
                            getOptionLabel={(option) =>
                              option.department_name || ""
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={
                                  Department.length === 0
                                    ? "No department added yet"
                                    : "Department"
                                }
                                variant="standard"
                                style={{ width: "100%" }}
                                InputProps={{
                                  ...params.InputProps,
                                  type: "search",
                                }}
                              />
                            )}
                            value={
                              Department.find(
                                (option) => option.id === branch.department_id
                              ) || {}
                            }
                            onChange={(event, newValue) =>
                              setBranch({ ...branch, department_id: newValue.id })
                            }
                          />
                          <div className="mt-1 text-center text-red-500">
                            {validationErrors.department_id &&
                              validationErrors.department_id.map(
                                (error, index) => <div key={index}>{error}</div>
                              )}
                          </div>
                        </Grid>
                      )}

                      {/* Button Row */}
                      <Grid
                        item
                        xs={12}
                        className="flex items-center justify-center"
                      >
                        <Button
                          type="submit"
                          disabled={loading}
                          variant="contained"
                          style={{
                            width: "300px",
                            fontWeight: "550",
                            borderRadius: "100px",
                            fontSize: "16px",
                            backgroundColor: "green",
                          }}
                        >
                          {loading ? "ADDING..." : "ADD"}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branch;
