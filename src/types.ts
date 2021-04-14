export interface GeneratedClass {
    /** The name of this class. All `.` are replaced with `_`. */
    name: string;
    /** The type. May be class, interface, or enum. Annotations are not generated. */
    type: string;
    /** The directory. Ex: `java/util` */
    directory: string;
    /** THe url. */
    url: string;
}