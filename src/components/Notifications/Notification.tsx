import { Store } from 'react-notifications-component'
class NotificationAction {
    static notificationError(message: string) {
        Store.addNotification({
            title: "Erro!",
            message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        })
    }

    static notificationWarning(message: string) {
        Store.addNotification({
            title: "Atenção!",
            message,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        })
    }

    static notificationSuccess(message: string) {
        Store.addNotification({
            title: "Sucesso!",
            message,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        })
    }
}

export {
    NotificationAction
}