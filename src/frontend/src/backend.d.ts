import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Project {
    status: string;
    title: string;
    description: string;
    category: string;
    location: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    addProject(projectId: string, category: string, title: string, description: string, location: string, status: string): Promise<void>;
    deleteProject(projectId: string): Promise<void>;
    getAllProjects(): Promise<Array<Project>>;
    getAllServices(): Promise<Array<[string, string]>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getProjectsByCategory(category: string): Promise<Array<Project>>;
    initialize(adminPrincipal: Principal): Promise<void>;
    isAdmin(callerId: Principal): Promise<boolean>;
    setAdmin(newAdmin: Principal): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
    updateProject(projectId: string, category: string, title: string, description: string, location: string, status: string): Promise<void>;
}
