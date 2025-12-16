export interface Post {
  id: number;
  title: string;
  heroImage?: (number | null) | Media;
  content: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  relatedPosts?: (number | Post)[] | null;
  categories?: (number | Category)[] | null;
  tags?: (number | Tag)[] | null;
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
  authors?: (number | User)[] | null;
  populatedAuthors?:
    | {
        id?: string | null;
        name?: string | null;
      }[]
    | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ("draft" | "published") | null;
}

export interface Category {
  id: number;
  title: string;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

export interface User {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}

export interface Media {
  id: number;
  /**
   * Ayuda a lectores de pantalla a describir la imagen. (No usar en imágenes decorativas)
   */
  alt?: string | null;
  /**
   * URL automáticamente compatible con Unpic.
   */
  unpicUrl?: string | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    small?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ContentBlock {
  enableTitle?: boolean | null;
  title?: string | null;
  enableImage?: boolean | null;
  image?: (number | null) | Media;
  enableBackgroundImage?: boolean | null;
  enableRichText?: boolean | null;
  richText?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  enableLink?: boolean | null;
  darkMode?: ("blue" | "dark") | null;
  link?: {
    type?: ("reference" | "custom" | "calendly") | null;
    newTab?: boolean | null;
    reference?: {
      relationTo: "pages";
      value: number | Page;
    } | null;
    url?: string | null;
    label: string;
    appearance?: ("default" | "outline") | null;
  };
  isReverse?: boolean | null;
  bottom?: number | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "content";
}
export interface Header {
  id: number;
  navItems?:
    | {
        navLinks?:
          | {
              items?:
                | {
                    title: string;
                    link?: {
                      type?: ("reference" | "custom" | "calendly") | null;
                      newTab?: boolean | null;
                      reference?: {
                        relationTo: "pages";
                        value: number | Page;
                      } | null;
                      url?: string | null;
                    };
                    subItems?:
                      | {
                          title: string;
                          description?: string | null;
                          enableImage?: boolean | null;
                          image?: (number | null) | Media;
                          link?: {
                            type?: ("reference" | "custom" | "calendly") | null;
                            newTab?: boolean | null;
                            reference?: {
                              relationTo: "pages";
                              value: number | Page;
                            } | null;
                            url?: string | null;
                          };
                          id?: string | null;
                        }[]
                      | null;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface Footer {
  id: number;
  navItems?:
    | {
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface Page {
  id: number;
  title: string;
  hero: {
    title: string;
    media: number | Media;
    removeSvg?: boolean | null;
    richText?: {
      root: {
        type: string;
        children: {
          type: any;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ("ltr" | "rtl") | null;
        format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    links?:
      | {
          link: {
            type?: ("reference" | "custom" | "calendly") | null;
            newTab?: boolean | null;
            reference?: {
              relationTo: "pages";
              value: number | Page;
            } | null;
            url?: string | null;
            label: string;
            /**
             * Choose how the link should be rendered.
             */
            appearance?: ("default" | "outline") | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  layout: ContentBlock[];
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ("draft" | "published") | null;
}

export interface ListContentBlock {
  enableTitle?: boolean | null;
  title?: string | null;
  enableSubTitle?: boolean | null;
  subTitle?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  enableImage?: boolean | null;
  fieldImage?: (number | null) | Media;
  blocks?:
    | {
        enableFiledTitle?: boolean | null;
        fieldTitle?: string | null;
        enableIcon?: boolean | null;
        media?: (number | null) | Media;
        enableRichText?: boolean | null;
        richText?: {
          root: {
            type: string;
            children: {
              type: any;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format:
              | "left"
              | "start"
              | "center"
              | "right"
              | "end"
              | "justify"
              | "";
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        enableLink?: boolean | null;
        link?: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: "pages";
                value: number | Page;
              } | null)
            | ({
                relationTo: "posts";
                value: number | Post;
              } | null);
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ("default" | "outline") | null;
        };
        color?: ("transparent" | "green" | "yellow" | "red") | null;
        id?: string | null;
      }[]
    | null;
  enableBackgroundImage?: boolean | null;
  isReverse?: boolean | null;
  bottom?: number | null;
  separatorType?:
    | (
        | "separatorYellow"
        | "separatorWhite"
        | "separatorBackground"
        | "separatorDark"
      )
    | null;
  sectionName: string;
  darkMode?: ("blue" | "dark") | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "listContent";
}
export interface SocialMediaBlock {
  rrss?:
    | {
        title?: string | null;
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
        };
        icon?: (number | null) | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "social";
}
export interface MediaBlock {
  media: number | Media;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "mediaBlock";
}

export interface BoxContent {
  boxes?:
    | {
        title?: string | null;
        richText?: string | null;
        media: number | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "boxContent";
}

export interface CallToActionBlock {
  media?: (number | null) | Media;
  richText?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  enableBackgroundImage?: boolean | null;
  links?:
    | {
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ("default" | "outline") | null;
        };
        id?: string | null;
      }[]
    | null;
  isReverse?: boolean | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  bottom?: number | null;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  darkMode?: ("blue" | "dark") | null;
  blockType: "cta";
}

export interface SimpleListBlock {
  enableTitle?: boolean | null;
  title?: string | null;
  image: (number | null) | Media;
  enableBackgroundImage?: boolean | null;
  enableImage?: boolean | null;
  fieldImage?: (number | null) | Media;
  blocks?:
    | {
        enableIcon?: boolean | null;
        media?: (number | null) | Media;
        enableRichText?: boolean | null;
        richText?: {
          root: {
            type: string;
            children: {
              type: any;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format:
              | "left"
              | "start"
              | "center"
              | "right"
              | "end"
              | "justify"
              | "";
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        color?: ("transparent" | "green" | "yellow" | "red") | null;
        id?: string | null;
      }[]
    | null;
  isReverse?: boolean | null;
  darkMode?: ("blue" | "dark") | null;
  bottom?: number | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "simpleListContent";
}
export interface QuoteBlock {
  richText?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  enableImage?: boolean | null;
  image?: (number | null) | Media;
  links?:
    | {
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ("default" | "outline") | null;
        };
        id?: string | null;
      }[]
    | null;
  isReverse?: boolean | null;
  bottom?: number | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "quoteBlock";
}
export interface BannerBlock {
  style: "info" | "warning" | "error" | "success";
  content: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: "banner";
}
export interface FormBlock {
  id: string;
  enableHeaderText: boolean;
  headerText: [Object];
  enableCompanionText: boolean;
  enableBackgroundImage?: boolean | null;
  companionText: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  form: Form;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  darkMode?: ("blue" | "dark") | null;
  isReverse: boolean;
  bottom: number;
  blockName: string;
  blockType: string;
}
export interface Hero {
  title: string;
  media: number | Media;
  removeSvg?: boolean | null;
  isReverse?: boolean | null;
  bottom?: number | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  darkMode?: ("blue" | "dark") | null;
  richText?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  links?:
    | {
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
          appearance?: ("default" | "outline") | null;
        };
        id?: string | null;
      }[]
    | null;
}

export type BaseField = {
  id?: string | null;
  name: string;
  label?: string | null;
  width?: number | null;
  required?: boolean | null;
  blockName?: string | null;
};

export interface CheckboxField extends BaseField {
  blockType: "checkbox";
  defaultValue?: boolean | null;
  image?: (number | null) | Media;
}

export interface EmailField extends BaseField {
  blockType: "email";
}

export interface TextField extends BaseField {
  blockType: "text";
  defaultValue?: string | null;
  placeholder?: string | null;
}

export interface TextareaField extends BaseField {
  blockType: "textarea";
  defaultValue?: string | null;
  placeholder?: string | null;
}

export interface SelectField extends BaseField {
  blockType: "select";
  defaultValue?: string | null;
  placeholder?: string | null;
  options?:
    | {
        label: string;
        value: string;
        id?: string | null;
      }[]
    | null;
}

export interface RadioField extends BaseField {
  blockType: "radio";
  options: {
    label: string;
    value: string;
    image?: (number | null) | Media;
    id?: string | null;
  }[];
}

export interface MessageField {
  blockType: "message";
  message?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
}

export type FormField =
  | CheckboxField
  | EmailField
  | TextField
  | TextareaField
  | SelectField
  | RadioField
  | MessageField;

export interface Form {
  id: number;
  title: string;
  fields?: FormField[] | null;
  submitButtonLabel?: string | null;
  confirmationType?: "message" | "redirect" | null;
  confirmationMessage?: {
    root: {
      type: string;
      children: any[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  redirect?: { url: string };
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?: {
          root: {
            type: string;
            children: any[];
          };
        } | null;
        id?: string | null;
      }[]
    | null;
  notificationEmail?: string | null;
  slug: string;
  updatedAt: string;
  createdAt: string;
}

export interface Footer {
  id: number;
  navItems?:
    | {
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  enableBackgroundImage?: boolean | null;
  isReverse?: boolean | null;
  bottom?: number | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface Tag {
  id: number;
  title: string;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
export interface FrequentlyQuestionsBlock {
  enableTitle?: boolean | null;
  title?: string | null;
  enableText?: boolean | null;
  content?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  enableImage?: boolean | null;
  image?: (number | null) | Media;
  questions: {
    question: string;
    answer: string;
    id?: string | null;
  }[];
  sectionName?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "frequentlyQuestionsBlock";
}

export interface PricesBlock {
  enableTitle?: boolean | null;
  title?: string | null;
  enableText?: boolean | null;
  content?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  prices?:
    | {
        price: number;
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ("default" | "outline") | null;
        };
        isFeatured?: boolean | null;
        features?:
          | {
              feature: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "pricesBlock";
}

export interface ServiceListBlock {
  enableTitle?: boolean | null;
  title?: string | null;
  enableBackgroundImage?: boolean | null;
  blocks?:
    | {
        enableFiledTitle?: boolean | null;
        fieldTitle?: string | null;
        enableIcon?: boolean | null;
        media?: (number | null) | Media;
        enableRichText?: boolean | null;
        richText?: {
          root: {
            type: string;
            children: {
              type: any;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format:
              | "left"
              | "start"
              | "center"
              | "right"
              | "end"
              | "justify"
              | "";
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        link: {
          type?: ("reference" | "custom" | "calendly") | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ("default" | "outline") | null;
        };
        id?: string | null;
      }[]
    | null;
  isReverse?: boolean | null;
  bottom?: number | null;
  darkMode?: ("blue" | "dark") | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "serviceListBlock";
}

export interface ServiceBlock {
  slug: string;
  title?: string | null;
  richText: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  accordions?:
    | {
        title?: string | null;
        content?: {
          root: {
            type: string;
            children: {
              type: any;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format:
              | "left"
              | "start"
              | "center"
              | "right"
              | "end"
              | "justify"
              | "";
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  enableBackgroundImage?: boolean | null;
  bottom?: number | null;
  isReverse?: boolean | null;
  darkMode?: ("blue" | "dark") | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  sectionName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "service";
}

export interface PostCarouselBlock {
  enableBackgroundImage?: boolean | null;
  isReverse?: boolean | null;
  bottom?: number | null;
  separatorType?:
    | ("separatorYellow" | "separatorWhite" | "separatorBackground")
    | null;
  id?: string | null;
  darkMode?: ("blue" | "dark") | null;
  blockName?: string | null;
  blockType: "postCarouselBlock";
}

export interface Service {
  id: number;
  title: string;
  hero: {
    title: string;
    media: number | Media;
    removeSvg?: boolean | null;
    richText?: {
      root: {
        type: string;
        children: {
          type: any;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ("ltr" | "rtl") | null;
        format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    isReverse?: boolean | null;
    bottom?: number | null;
    separatorType?:
      | ("separatorYellow" | "separatorWhite" | "separatorBackground")
      | null;
    darkMode?: ("blue" | "dark") | null;
    links?:
      | {
          link: {
            type?: ("reference" | "custom" | "calendly") | null;
            newTab?: boolean | null;
            reference?:
              | ({
                  relationTo: "pages";
                  value: number | Page;
                } | null)
              | ({
                  relationTo: "posts";
                  value: number | Post;
                } | null)
              | ({
                  relationTo: "services";
                  value: number | Service;
                } | null);
            url?: string | null;
            label: string;
            /**
             * Elija cómo debe representarse el enlace
             */
            appearance?: ("default" | "outline") | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  layout: ServiceBlock[];
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ("draft" | "published") | null;
}
