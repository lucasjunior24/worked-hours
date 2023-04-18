export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Initial: undefined;
            Home: undefined;
            CarDetails: { car: CarDTO };
            MyCars: undefined;
            
            Scheduling: { car: CarDTO };
            SchedulingDetails: { car: CarDTO, dates: any };
            MyCars: undefined;
            Confirmation: { title: string, message: string, nextScreenRoute: string};
            SignUpSecondStep: undefined;
            SignUpFirstStep: undefined;
            SignIn: undefined;
        }
    }
}