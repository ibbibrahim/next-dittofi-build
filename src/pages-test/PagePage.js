import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  PureComponent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { get } from "lodash";
import _ from "lodash";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Chart,
  PieChart,
  RichTextEditor,
  RichText,
  ToggleWrapper,
  Tabs,
  Slider,
  Form,
  MountHandler,
  Draggable,
  ErrorBoundary,
  toISOString,
  toLocalString,
  ZoomablePannable,
  Progress,
  RangeSlider,
  getFileUrl,
  Select,
  MapBox,
  Marker,
  DynamicComponent,
  Link,
} from "../components/dittofi-components";
import { useRouter } from "next/navigation";
function Container(props) {
  let { dispatch, currentUser, signUpEPI, updatePasswordEPI } = props;

  const [tasks, setTasks] = useState({});
  let history;
	if(true){
		history = useRouter();
	}else{
		history = useHistory();
	}

  var startPoll = (action) => {
    console.log(`Starting poll for action ${action.name}`);

    // Prevent polling the same action more than once.
    if (tasks[action.name]) {
      console.warn(
        `You're attempting to poll ${action.name} but it is already being polled.`
      );
      return;
    }

    // Handle stopping poll.
    let canceled = false;
    const cancel = () => (canceled = true);

    // Poll action.
    const poll = () => {
      console.log(`Polling action ${action.name}`);

      if (canceled) {
        return;
      }

      dispatch({
        type: action.name,
        history: history,
        inputVariables: action.payload ? action.payload : {},
      });

      setTimeout(() => poll(), action.pollingPeriod);
    };

    setTasks({ ...tasks, [action.name]: cancel });
    poll();
  };

  var stopPoll = (actionName) => {
    console.log(`Stopping poll for action ${actionName}`);

    // Check task exists.
    if (!tasks[actionName]) {
      console.warn(
        `You're attempting to stop polling ${actionName} but this action is not running.`
      );
      return;
    }

    tasks[actionName]();
  };

  var runAction = (action) => {
    if (action.pollingPeriod && action.pollingPeriod > 0) {
      startPoll(action);
    } else {
      dispatch({
        inputVariables: action.payload ? action.payload : {},
        params: {},
        history: history,
        type: action.name,
        timeout: action.timeout && action.timeout > 0 ? action.timeout : null,
      });
    }
  };

  useEffect(() => {
    return () => {
      Object.keys(tasks).forEach((t) => stopPoll(t));
    };
  }, [tasks]);

  useEffect(() => {
    window.scrollTo(0, 0);
    /* TODO - run sagas on page mount (be sure not to rerun in page parameter change hook) */
  }, []);

  return (
    <ErrorBoundary>
      <div className="dashboard" id="i8qg-2">
        <div id="i0v6fb">
          <nav className="sidebar border-end px-4 py-3 bg-white">
            <a
              className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark mb-5"
              href="#"
              target="_self"
              type="external"
            >
              <img
                className="me-3"
                src=" https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11431-logo-purple.png"
              ></img>

              <div id="ikbf5">
                <div id="itqh4">
                  <h4 id="i3f3j">User</h4>
                </div>

                <div id="icelm">
                  <h4 id="igmr4">Profile</h4>
                </div>
              </div>
            </a>

            <div className="my-3 pb-3 border-bottom">
              <h4 className="text-uppercase small">Dashboards</h4>

              <a
                className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2"
                href="#"
                target="_self"
                type="external"
              >
                <i className="fas fa-check-square"></i>

                <span className="ms-2">Menu Item</span>
              </a>

              <a
                className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2"
                href="#"
                target="_self"
                type="external"
              >
                <i className="fas fa-check-square"></i>

                <span className="ms-2">Menu Item</span>
              </a>

              <a
                className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2"
                href="#"
                target="_self"
                type="external"
              >
                <i className="fas fa-check-square"></i>

                <span className="ms-2">Menu Item</span>
              </a>
            </div>

            <div className="my-3 pb-3">
              <h4 className="text-uppercase small">Dashboard</h4>

              <a
                className="d-inline-block w-100 d-flex align-items-center text-decoration-none text-dark py-2"
                href="#"
                target="_self"
                type="external"
              >
                <i className="fas fa-check-square"></i>

                <span className="ms-2">Menu Item</span>
              </a>
            </div>
          </nav>

          <div
            className="mobile-backdrop"
            onClick={(e) => {
              var value = e.target.value;
              runAction({ name: "ToggleSidebar" });
            }}
          ></div>

          <main className="content p-4 p-lg-5">
            <div>
              <div>
                <div className="d-flex align-items-center mb-5">
                  <div
                    className="btn me-2 d-md-none"
                    onClick={(e) => {
                      var value = e.target.value;
                      runAction({ name: "ToggleSidebar" });
                    }}
                  >
                    <i className="fas fa-bars"></i>
                  </div>

                  <div className="logo-small bg-primary d-flex align-items-center justify-content-center me-2">
                    <img src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11430-logo-white.svg"></img>
                  </div>

                  <h3 className="m-0 fw-bold">Welcome back!</h3>

                  <div className="ms-auto">
                    <ToggleWrapper className="d-dropdown d--open">
                      <div
                        className="d-dropdown-toggle p-0"
                        role="d-toggle-button"
                      >
                        <div className="logo-small bg-primary d-flex align-items-center justify-content-center me-2 text-white fw-bold">
                          <i className="fas fa-user"></i>
                        </div>
                      </div>

                      <div
                        className="d-dropdown-list bg-white rounded border end-0 py-2 px-2"
                        role="d-toggle-wrapper"
                      >
                        <div>
                          <div className="list-group list-group-flush">
                            <Link
                              className="d-inline-block list-group-item d-flex align-items-center list-group-item-action"
                              target="_self"
                              to="/"
                              type="spa"
                            >
                              <i className="fas fa-user"></i>

                              <div className="ms-3">
                                <div className="fw-bold">
                                  <span className="text-nowrap me-1">
                                    First
                                  </span>

                                  <span className="text-nowrap">Last</span>
                                </div>

                                <div>
                                  <span className="text-muted small">
                                    {currentUser?.["email"] !== null
                                      ? currentUser?.["email"]
                                      : ""}
                                  </span>
                                </div>
                              </div>
                            </Link>

                            <Link
                              className="d-inline-block list-group-item d-flex align-items-center border-bottom-0 list-group-item-action"
                              target="_self"
                              to="/"
                              type="spa"
                            >
                              <i className="fas fa-cog"></i>

                              <span className="text-nowrap fw-bold ms-3">
                                Profile Settings
                              </span>
                            </Link>

                            <Link
                              className="d-inline-block list-group-item d-flex align-items-center list-group-item-action"
                              target="_self"
                              to="/"
                              type="spa"
                            >
                              <i className="fas fa-question"></i>

                              <span className="text-nowrap fw-bold ms-3">
                                Help Center
                              </span>
                            </Link>

                            <div
                              className="d-inline-block list-group-item d-flex align-items-center list-group-item-action"
                              onClick={(e) => {
                                var value = e.target.value;
                                runAction({ name: "Logout" });
                              }}
                            >
                              <i className="fas fa-sign-out"></i>

                              <span className="text-nowrap fw-bold ms-3">
                                Sign out
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ToggleWrapper>
                  </div>
                </div>
              </div>
            </div>

            <div id="ifbzs">
              <Tabs className="d-tabs" activetab="0" data-df-type="tabs">
                <div className="card mb-3">
                  <div className="card-body pb-0">
                    <div className="d-flex mb-2">
                      <div className="me-3">
                        <img src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11447-avatar.svg"></img>
                      </div>

                      <div className="flex-grow-1">
                        <div className="d-flex mb-2 align-items-center flex-wrap">
                          <div>
                            <div>
                              <h5 id="ibqnm">James Virgo</h5>
                            </div>

                            <div className="d-flex flex-wrap text-muted">
                              <div className="d-flex align-items-center me-2">
                                <i className="bi me-1 bi-person"></i>

                                <span>CEO</span>
                              </div>

                              <div className="d-flex align-items-center me-2">
                                <i className="bi me-1 bi-map"></i>

                                <span>United Kingdom</span>
                              </div>

                              <div className="d-flex align-items-center">
                                <i className="bi me-1 bi-mailbox"></i>

                                <span id="iadaje">
                                  {currentUser?.["email"] !== null
                                    ? currentUser?.["email"]
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="ms-auto">
                            <div className="d-flex">
                              <h6 className="text-muted fw-bold">
                                Member since 2021
                              </h6>
                            </div>

                            <div className="d-flex">
                              <a className="btn btn-primary me-2">Button</a>

                              <a className="btn border-primary">Button</a>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className="d-flex">
                            <div>
                              <div>
                                <span className="text-muted">
                                  Last updated 3 minutes ago
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="d-tab-menu nav nav-tabs border-bottom-0"
                      role="d-tabsmenu"
                    >
                      <div className="nav-item" role="d-tablink">
                        <span className="nav-link">Overview</span>
                      </div>

                      <div className="nav-item" role="d-tablink">
                        <span className="nav-link">Projects</span>
                      </div>

                      <div className="nav-item" role="d-tablink">
                        <span className="nav-link">Campaigns</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="d-tab-content"
                  data-df-type="tab-content"
                  role="d-tabcontent"
                >
                  <div
                    className="d-tab-pane d--tab-active"
                    data-df-type="tab-pane"
                  >
                    <div id="imodbl">
                      <div className="card shadow-sm mb-3">
                        <div className="card-header">
                          <h5 className="m-0">Profile Details</h5>
                        </div>

                        <div className="card-body">
                          <Form
                            id="i31ed8"
                            onSubmit={(e) => {
                              var value = e.target.value;
                              runAction({ name: "SignupWithValidation" });
                            }}
                          >
                            <div className="mb-2">
                              <div
                                className="d--form-group"
                                data-preview-valid="all"
                                id="i1nd74"
                              >
                                <input
                                  className="form-control form-control-lg"
                                  name="signUpEPI.password"
                                  placeholder="First Name *"
                                  required="true"
                                  type="password"
                                  onChange={(e) => {
                                    var value = e.target.value;
                                    dispatch({
                                      type: "change_input",
                                      payload: { name: e.target.name, value },
                                    });
                                  }}
                                  value={
                                    signUpEPI?.["password"] !== null
                                      ? signUpEPI?.["password"]
                                      : ""
                                  }
                                ></input>

                                <div
                                  className="d--invalid-feedback"
                                  id="i6gmei"
                                >
                                  <span>Required field</span>
                                </div>
                              </div>

                              <div
                                className="d--form-group"
                                data-preview-valid="all"
                                id="iorbow"
                              >
                                <input
                                  className="form-control form-control-lg"
                                  name="signUpEPI.password"
                                  placeholder="Last Name *"
                                  required="true"
                                  type="password"
                                  onChange={(e) => {
                                    var value = e.target.value;
                                    dispatch({
                                      type: "change_input",
                                      payload: { name: e.target.name, value },
                                    });
                                  }}
                                  value={
                                    signUpEPI?.["password"] !== null
                                      ? signUpEPI?.["password"]
                                      : ""
                                  }
                                ></input>

                                <div className="d--invalid-feedback">
                                  <span>Required field</span>
                                </div>
                              </div>
                            </div>

                            <div id="ij5ydz">
                              <button className="btn btn-primary" type="submit">
                                Save Changes
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>

                      <div className="card shadow-sm mb-3">
                        <div className="card-header">
                          <h5 className="m-0">Change Password</h5>
                        </div>

                        <div className="card-body">
                          <Form
                            id="imj6h3"
                            onSubmit={(e) => {
                              var value = e.target.value;
                              runAction({ name: "UpdatePassword" });
                            }}
                          >
                            <div className="mb-2">
                              <div
                                className="d--form-group"
                                data-preview-valid="all"
                                id="i99u25"
                              >
                                <input
                                  className="form-control form-control-lg"
                                  name="updatePasswordEPI.old_password"
                                  placeholder="Old Password *"
                                  required="true"
                                  type="password"
                                  onChange={(e) => {
                                    var value = e.target.value;
                                    dispatch({
                                      type: "change_input",
                                      payload: { name: e.target.name, value },
                                    });
                                  }}
                                  value={
                                    updatePasswordEPI?.["old_password"] !== null
                                      ? updatePasswordEPI?.["old_password"]
                                      : ""
                                  }
                                ></input>

                                <div
                                  className="d--invalid-feedback"
                                  id="iv2dca"
                                >
                                  <span>Required field</span>
                                </div>
                              </div>

                              <div
                                className="d--form-group"
                                data-preview-valid="all"
                                id="iya3pr"
                              >
                                <input
                                  className="form-control form-control-lg"
                                  name="updatePasswordEPI.new_password"
                                  placeholder="New Password *"
                                  required="true"
                                  type="password"
                                  onChange={(e) => {
                                    var value = e.target.value;
                                    dispatch({
                                      type: "change_input",
                                      payload: { name: e.target.name, value },
                                    });
                                  }}
                                  value={
                                    updatePasswordEPI?.["new_password"] !== null
                                      ? updatePasswordEPI?.["new_password"]
                                      : ""
                                  }
                                ></input>

                                <div
                                  className="d--invalid-feedback"
                                  id="i0jvpt"
                                >
                                  <span>Required field</span>
                                </div>
                              </div>

                              <div
                                className="d--form-group"
                                data-preview-valid="all"
                                id="iaim4y"
                              >
                                <input
                                  className="form-control form-control-lg"
                                  name="updatePasswordEPI.confirm_password"
                                  placeholder="Confirm New Password *"
                                  required="true"
                                  type="password"
                                  onChange={(e) => {
                                    var value = e.target.value;
                                    dispatch({
                                      type: "change_input",
                                      payload: { name: e.target.name, value },
                                    });
                                  }}
                                  value={
                                    updatePasswordEPI?.["confirm_password"] !==
                                    null
                                      ? updatePasswordEPI?.["confirm_password"]
                                      : ""
                                  }
                                ></input>

                                <div
                                  className="d--invalid-feedback"
                                  id="ivafaj"
                                >
                                  <span>Required field</span>
                                </div>
                              </div>
                            </div>

                            <div id="i2ue13">
                              <button className="btn btn-primary" type="submit">
                                Save Changes
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>

                      <div className="card shadow-sm">
                        <div className="card-header">
                          <h5 className="m-0">Deactivate Account</h5>
                        </div>

                        <div className="card-body">
                          <Form
                            id="iq0e8p"
                            onSubmit={(e) => {
                              var value = e.target.value;
                              runAction({ name: "SignupWithValidation" });
                            }}
                          >
                            <div className="mb-2">
                              <div className="alert d-flex align-items-center alert-warning">
                                <i className="me-4 fa fs-5 fa-warning"></i>

                                <div className="d-flex flex-column">
                                  <h4 className="mb-1 text-dark fw-bold">
                                    You are deactivating your account
                                  </h4>

                                  <span id="i4rkyt">
                                    This process is irreversible
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div id="i90gd6">
                              <button className="btn btn-danger" type="submit">
                                Deactivate Account
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-tab-pane" data-df-type="tab-pane"></div>

                  <div className="d-tab-pane" data-df-type="tab-pane"></div>
                </div>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

const mapStateToProps = function (state) {
  return state.reducer;
};

export default connect(mapStateToProps, null)(Container);
