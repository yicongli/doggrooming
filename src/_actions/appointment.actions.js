import { appointmentConstants } from '../_constants';
import { dogService, appointmentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const appointmentActions = {
    getAllAppointment,
    addAppointment,
    getAllBreed,
    getAllGroomingType,
    getAllDogs
};

function getAllAppointment(userID, isGroomer) {
    return dispatch => {
        dispatch(request());
        var getAppointment = isGroomer ? appointmentService.getGroomerAppointment : appointmentService.getClientAppointment; 

        getAppointment(userID)
            .then(
                appointments => dispatch(success(appointments)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: appointmentConstants.APPOINTMENT_VIEW } }
    function success(appointments) {return { type: appointmentConstants.APPOINTMENT_VIEW_SECCESS, appointments } }
    function failure(error) { return { type: appointmentConstants.APPOINTMENT_VIEW_FAILURE, error } }
}

function addAppointment(appointment) {
    return dispatch => {
        dispatch(request(appointment));

        appointmentService.addAppointment(appointment)
            .then(
                () => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Add appointment successful'));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(appointment) { return { type: appointmentConstants.APPOINTMENT_ADD, appointment } }
    function success(appointment) { return { type: appointmentConstants.APPOINTMENT_ADD_SECCESS, appointment } }
    function failure(error) { return { type: appointmentConstants.APPOINTMENT_ADD_FAILURE, error } }
}


function getAllBreed () {
    return dispatch => {
        dispatch(request());

        appointmentService.getAllBreed()
            .then(
                breeds => dispatch(success(breeds)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: appointmentConstants.BREED_VIEW } }
    function success(breeds) {return { type: appointmentConstants.BREED_VIEW_SECCESS, breeds } }
    function failure(error) { return { type: appointmentConstants.BREED_VIEW_FAILURE, error } }
}

function getAllGroomingType () {
    return dispatch => {
        dispatch(request());

        appointmentService.getAllGroomingType()
            .then(
                groomingTypes => dispatch(success(groomingTypes)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: appointmentConstants.GROOMING_TYPE_VIEW } }
    function success(groomingTypes) {return { type: appointmentConstants.GROOMING_TYPE_VIEW_SECCESS, groomingTypes } }
    function failure(error) { return { type: appointmentConstants.GROOMING_TYPE_VIEW_FAILURE, error } }
}

function getAllDogs (clientID) {
    return dispatch => {
        dispatch(request());

        dogService.getAllDogs(clientID)
            .then(
                dogs => dispatch(success(dogs)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: appointmentConstants.DOG_VIEW } }
    function success(dogs) {return { type: appointmentConstants.DOG_VIEW_SECCESS, dogs } }
    function failure(error) { return { type: appointmentConstants.DOG_VIEW_FAILURE, error } }
}

