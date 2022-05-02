export declare namespace TelegramWebApps {
  interface SDK {
    WebApp: WebApp;
  }

  /**
   * Available app events.
   */
  type EventType = "themeChanged" | "viewportChanged" | "mainButtonClicked";

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
     * An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface.
     */
    MainButton: MainButton;
    /**
     * A method that sets the app event handler.
     */
    onEvent(eventType: EventType, eventHandler: Function): void;
    /**
     * 	A method that deletes a previously set event handler.
     */
    offEvent(eventType: EventType, eventHandler: Function): void;
    /**
     * A method used to send data to the bot.
     */
    sendData(data): void;
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
     * An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for Web Apps launched via the attachment menu.
     */
    receiver?: WebAppUser;
    /**
     * The value of the startattach parameter, passed via link. Only returned for Web Apps when launched from the attachment menu via link.
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
    setText(text: string): MainButton;
    /**
     * A method that sets the button press event handler. An alias for Telegram.WebApp.onEvent('mainButtonClicked', callback)
     */
    onClick(callback: Function): MainButton;
    /**
     * A method to make the button visible.
     */
    show(): MainButton;
    /**
     * A method to hide the button.
     */
    hide(): MainButton;
    /**
     * A method to enable the button.
     */
    enable(): MainButton;
    /**
     * A method to disable the button.
     */
    disable(): MainButton;
    /**
     * A method to show a loading indicator on the button.
     */
    showProgress(leaveActive: boolean): MainButton;
    /**
     * A method to hide the loading indicator.
     */
    hideProgress(): MainButton;
    /**
     * A method to set the button parameters.
     */
    setParams(params: MainButtonParams): MainButton;
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
}

declare global {
  const Telegram: TelegramWebApps.SDK;
}
