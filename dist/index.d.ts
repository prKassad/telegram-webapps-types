type ReverseMap<T> = T[keyof T];

export declare namespace TelegramWebApps {
  interface SDK {
    WebApp: WebApp;
  }

  const Events = {
    /**
     * eventHandler receives no parameters, new theme settings and color scheme can be received via this.themeParams and this.colorScheme respectively.
     */
    themeChanged = 'themeChanged',
    /**
     * eventHandler receives an object with the single field isStateStable. 
     * If isStateStable is true, the resizing of the Web App is finished. 
     * If it is false, the resizing is ongoing (the user is expanding or collapsing the Web App or an animated object is playing). 
     * The current value of the visible section’s height is available in this.viewportHeight.
     */
    viewportChanged = 'viewportChanged',
    /**
     * eventHandler receives no parameters.
     */
    mainButtonClicked = 'mainButtonClicked',
    /**
     * eventHandler receives no parameters.
     */
    backButtonClicked = 'backButtonClicked',
    /**
     * eventHandler receives no parameters.
     */
    settingsButtonClicked = 'settingsButtonClicked',
    /**
     * eventHandler receives an object with the two fields: 
     * url – invoice link provided and status – one of the invoice statuses:
     * -- paid – invoice was paid successfully,
     * -- cancelled – user closed this invoice without paying,
     * -- failed – user tried to pay, but the payment was failed,
     * -- pending – the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid.
     */
    invoiceClosed = 'invoiceClosed'
  } as const;

  type EventType = ReverseMap<typeof Events>;

  interface WebApp {
    /**
     * A string with raw data transferred to the Web App, convenient for validating data.
     * WARNING: Validate data from this field before using it on the bot's server.
     */
    initData: string;
    /**
     * An object with input data transferred to the Web App.
     * WARNING: Data from this field should not be trusted.
     * You should only use data from initData on the bot's server and only after it has been validated.
     */
    initDataUnsafe: WebAppInitData;
    /**
     * The version of the Bot API available in the user's Telegram app.
     */
    version: string;
    /**
     * The color scheme currently used in the Telegram app. Either “light” or “dark”.
     * Also available as the CSS variable var(--tg-color-scheme).
     */
    colorScheme: "light" | "dark";
    /**
     * An object containing the current theme settings used in the Telegram app.
     */
    themeParams: ThemeParams;
    /**
     * True if the Web App is expanded to the maximum available height.
     * False, if the Web App occupies part of the screen and can be expanded to the full height using the expand() method.
     */
    isExpanded: boolean;
    /**
     * The current height of the visible area of the Web App. Also available in CSS as the variable var(--tg-viewport-height).
     */
    viewportHeight: number;
    /**
     * The height of the visible area of the Web App in its last stable state. Also available in CSS as a variable var(--tg-viewport-stable-height).
     */
    viewportStableHeight: number;
    /**
     * Current header color in the #RRGGBB format.
     */
    headerColor: string;
    /**
    * Current background color in the #RRGGBB format.
    */
    backgroundColor: string;
    /**
     * An object for controlling the back button which can be displayed in the header of the Web App in the Telegram interface.
     */
    BackButton: BackButton;
    /**
     * An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface.
     */
    MainButton: MainButton;
    /**
     * An object for controlling haptic feedback.
     */
    HapticFeedback: HapticFeedback;
    /**
     * Returns true if the user's app supports a version of the Bot API that is equal to or higher than the version passed as the parameter.
     */
    isVersionAtLeast(version: number): boolean;
    /**
     * Bot API 6.1+ 
     * A method that sets the app header color. 
     * You can only pass Telegram.WebApp.themeParams.bg_color or Telegram.WebApp.themeParams.secondary_bg_color as a color or you can use keywords bg_color, secondary_bg_color instead.
     */
    setHeaderColor(color: "bg_color" | "secondary_bg_color" | string): void;
    /**
     * Bot API 6.1+ 
     * A method that sets the app background color in the #RRGGBB format or you can use keywords bg_color, secondary_bg_color instead.
     */
    setBackgroundColor(color: string): void;
    /**
     * A method that sets the app event handler.
     */
    onEvent(eventType: EventType, eventHandler: () => void): void;
    /**
     * 	A method that deletes a previously set event handler.
     */
    offEvent(eventType: EventType, eventHandler: () => void): void;
    /**
     * A method used to send data to the bot.
     */
    sendData(data): void;
    /**
     * A method that opens a link in an external browser. 
     * The Web App will not be closed.
     * Note that this method can be called only in response to the user interaction with the Web App interface (e.g. click inside the Web App or on the main button)
     */
    openLink(url: string): void;
    /**
     * A method that opens a telegram link inside Telegram app. 
     * The Web App will be closed.
     */
    openTelegramLink(url: string): void;
    /**
     * Bot API 6.1+ 
     * A method that opens an invoice using the link url. 
     * The Web App will receive the event invoiceClosed when the invoice is closed. 
     * If an optional callback parameter was passed, the callback function will be called and the invoice status will be passed as the first argument.
     */
    openInvoice(url: string, callback: () => void): void;
    /**
     * A method that informs the Telegram app that the Web App is ready to be displayed.
     */
    ready(): void;
    /**
     * A method that expands the Web App to the maximum available height.
     */
    expand(): void;
    /**
     * A method that closes the Web App.
     */
    close(): void;
  }

  interface ThemeParams {
    /**
     * Background color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-bg-color).
     */
    bg_color?: string;
    /**
     * Main text color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-text-color).
     */
    text_color?: string;
    /**
     * Hint text color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-hint-color).
     */
    hint_color?: string;
    /**
     * Link color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-link-color).
     */
    link_color?: string;
    /**
     * Button color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-button-color).
     */
    button_color?: string;
    /**
     * Button text color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-button-text-color).
     */
    button_text_color?: string;
    /**
     * Bot API 6.1+ 
     * Secondary background color in the #RRGGBB format.
     * Also available as the CSS variable var(--tg-theme-secondary-bg-color).
     */
    secondary_bg_color?: string;
  }

  interface BackButton {
    /**
     * 	Shows whether the button is visible. Set to false by default.
     */
    isVisible:	boolean;
    /**
     * Bot API 6.1+ 
     * A method that sets the button press event handler. 
     * An alias for Telegram.WebApp.onEvent('backButtonClicked', callback)
     */
    onClick(callback: () => void): void;	
    /**
     * Bot API 6.1+ 
     * A method that removes the button press event handler. 
     * An alias for Telegram.WebApp.offEvent('backButtonClicked', callback)
     */
    offClick(callback: () => void): void;
    /**
     * Bot API 6.1+ 
     * A method to make the button active and visible.
     */
    show(): void;
    /**
     * Bot API 6.1+ 
     * A method to hide the button.
     */
    hide(): void;	
  }

  interface MainButton {
    /**
     * Current button text. Set to CONTINUE by default.
     */
    text: string;
    /**
     * 	Current button color. Set to themeParams.button_color by default.
     */
    color: string;
    /**
     * Current button text color. Set to themeParams.button_text_color by default.
     */
    textColor: string;
    /**
     * Shows whether the button is visible. Set to false by default.
     */
    isVisible: boolean;
    /**
     * Shows whether the button is active. Set to true by default.
     */
    isActive: boolean;
    /**
     * Readonly. Shows whether the button is displaying a loading indicator.
     */
    isProgressVisible: boolean;
    /**
     * A method to set the button text.
     */
    setText(text: string): void;
    /**
     * A method that sets the button press event handler. An alias for Telegram.WebApp.onEvent('mainButtonClicked', callback)
     */
    onClick(callback: () => void): void;
    /**
     * A method that removes the button press event handler.
     * An alias for Telegram.WebApp.offEvent('mainButtonClicked', callback)
     */
    offClick(callback: () => void): void;
    /**
     * A method to make the button visible.
     */
    show(): void;
    /**
     * A method to hide the button.
     */
    hide(): void;
    /**
     * A method to enable the button.
     */
    enable(): void;
    /**
     * A method to disable the button.
     */
    disable(): void;
    /**
     * A method to show a loading indicator on the button.
     */
    showProgress(leaveActive: boolean): void;
    /**
     * A method to hide the loading indicator.
     */
    hideProgress(): void;
    /**
     * A method to set the button parameters.
     */
    setParams(params: MainButtonParams): void;
  }

  interface MainButtonParams {
    /**
     * Button text.
     */
    text?: string;
    /**
     * Button color.
     */
    color?: string;
    /**
     * Button text color.
     */
    text_color?: string;
    /**
     * Enable the button.
     */
    is_active?: boolean;
    /**
     * Show the button.
     */
    is_visible?: boolean;
  }

  interface HapticFeedback {
    /**
     * Bot API 6.1+ 
     * A method tells that an impact occurred. 
     * The Telegram app may play the appropriate haptics based on style value passed. 
     * Style can be one of these values:
     * - light, indicates a collision between small or lightweight UI objects,
     * - medium, indicates a collision between medium-sized or medium-weight UI objects,
     * - heavy, indicates a collision between large or heavyweight UI objects,
     * - rigid, indicates a collision between hard or inflexible UI objects,
     * - soft, indicates a collision between soft or flexible UI objects.
     */
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    /**
     * Bot API 6.1+ 
     * A method tells that a task or action has succeeded, failed, or produced a warning. 
     * The Telegram app may play the appropriate haptics based on type value passed. 
     * Type can be one of these values:
     * - error, indicates that a task or action has failed,
     * - success, indicates that a task or action has completed successfully,
     * - warning, indicates that a task or action produced a warning.
     */
    notificationOccurred(type: "error" | "success" | "warning"): void;
    /**
     * Bot API 6.1+ 
     * A method tells that the user has changed a selection. 
     * The Telegram app may play the appropriate haptics.
     * Do not use this feedback when the user makes or confirms a selection; use it only when the selection changes.
     */
    selectionChanged(): void;
  }

  interface WebAppInitData {
    /**
     * A unique identifier for the Web App session, required for sending messages via the answerWebAppQuery method.
     */
    query_id?: string;
    /**
     * An object containing data about the current user.
     */
    user?: WebAppUser;
    /**
     * An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. 
     * Returned only for Web Apps launched via the attachment menu.
     */
    receiver?: WebAppUser;
    /**
     * An object containing data about the chat where the bot was launched via the attachment menu. 
     * Returned for supergroups, channels and group chats – only for Web Apps launched via the attachment menu.
     */
    chat?: WebAppChat;
    /**
     * Time in seconds, after which a message can be sent via the answerWebAppQuery method.
     */
    can_send_after?: number;
    /**
     * The value of the startattach parameter, passed via link. 
     * Only returned for Web Apps when launched from the attachment menu via link.
     */
    start_param?: string;
    /**
     * Unix time when the form was opened.
     */
    auth_date?: number;
    /**
     * A hash of all passed parameters, which the bot server can use to check their validity.
     */
    hash?: string;
  }

  interface WebAppUser {
    /**
     * A unique identifier for the user or bot.
     */
    id?: number;
    /**
     * True, if this user is a bot. Returns in the receiver field only.
     */
    is_bot: boolean;
    /**
     * First name of the user or bot.
     */
    first_name: string;
    /**
     * Last name of the user or bot.
     */
    last_name?: string;
    /**
     * Username of the user or bot.
     */
    usernames?: string;
    /**
     * IETF language tag of the user's language. Returns in user field only.
     */
    language_code?: string;
    /**
     * URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. Only returned for Web Apps launched from the attachment menu.
     */
    photo_url?: string;
  }

  interface WebAppChat {
    /**
     * Unique identifier for this chat. 
     * This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. 
     * But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
     */
    id: BigInt;
    /**
     * Type of chat, can be either “group”, “supergroup” or “channel”
     */
    type: "group" | "supergroup" | "channel";
    /**
     * Title of the chat
     */
    title: string;
    /**
     * Username of the chat
     */
    username?: string;
    /**
     * URL of the chat’s photo. 
     * The photo can be in .jpeg or .svg formats. 
     * Only returned for Web Apps launched from the attachment menu.
     */
    photo_url?: string;
  }
  
}


declare global {
  const Telegram: TelegramWebApps.SDK;
}
