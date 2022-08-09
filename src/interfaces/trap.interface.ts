export interface Trap {
    id: number;
    project_name: string;
    surveyor_name: string;
    camera_id: number;
    setup: Date;
    latitude: string;
    longitude: string;
    cam_procedure: string;
    cam_attached: string;
    cam_height: number;
    area_name: string;
    cam_make: string;
    cam_feature: string;
    cam_trap_test: boolean;
    cam_working: boolean;
    comments: string;
    reviewed: boolean;
    createdAt: Date;
    updatedAt: Date;
}