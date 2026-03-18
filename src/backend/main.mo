import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type Project = {
    category : Text;
    title : Text;
    description : Text;
    location : Text;
    status : Text;
  };

  var admin : ?Principal = null;

  let contactSubmissions = List.empty<ContactSubmission>();

  let projects = Map.empty<Text, Project>();

  let services = Map.fromArray([
    ("Residential Construction", "High-quality homes"),
    ("Commercial Construction", "Business-focused spaces"),
    ("Renovations", "Transform existing properties"),
    ("Real Estate Sales", "Buying and selling"),
  ]);

  public shared ({ caller }) func initialize(adminPrincipal : Principal) : async () {
    if (admin != null) { Runtime.trap("Contract already has admin.") };
    admin := ?adminPrincipal;
  };

  func assertAdmin(caller : Principal) {
    switch (admin) {
      case (null) { Runtime.trap("Contract has no admin. Please call initialize function. ") };
      case (?adminPrincipal) {
        if (adminPrincipal != caller) { Runtime.trap("Unauthorized access") };
      };
    };
  };

  public shared ({ caller }) func setAdmin(newAdmin : Principal) : async () {
    assertAdmin(caller);
    admin := ?newAdmin;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
    };
    contactSubmissions.add(submission);
  };

  public shared ({ caller }) func addProject(projectId : Text, category : Text, title : Text, description : Text, location : Text, status : Text) : async () {
    assertAdmin(caller);
    let project : Project = {
      category;
      title;
      description;
      location;
      status;
    };
    projects.add(projectId, project);
  };

  public shared ({ caller }) func updateProject(projectId : Text, category : Text, title : Text, description : Text, location : Text, status : Text) : async () {
    assertAdmin(caller);
    switch (projects.get(projectId)) {
      case (null) { Runtime.trap("Project not found") };
      case (?_) {
        let updatedProject : Project = {
          category;
          title;
          description;
          location;
          status;
        };
        projects.add(projectId, updatedProject);
      };
    };
  };

  public shared ({ caller }) func deleteProject(projectId : Text) : async () {
    assertAdmin(caller);
    projects.remove(projectId);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray();
  };

  public query ({ caller }) func getProjectsByCategory(category : Text) : async [Project] {
    projects.values().toArray().filter(
      func(project) {
        Text.equal(project.category, category);
      }
    );
  };

  public query ({ caller }) func getAllServices() : async [(Text, Text)] {
    services.toArray();
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.toArray();
  };

  public query ({ caller }) func isAdmin(callerId : Principal) : async Bool {
    switch (admin) {
      case (null) { false };
      case (?adminId) { adminId == callerId };
    };
  };
};
