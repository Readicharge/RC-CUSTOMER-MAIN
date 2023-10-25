import moment from 'moment';

export const formatFileSize = (size) => {
    if (size < 1024) {
        return `${size} Bytes`;
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
        return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else {
        return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
};

export const getFormattedDate = (date, from, to) => {
    const fromFormatted = +from >= 12 ? `${+from % 12} PM` : `${from} AM`;
    const toFormatted = +to >= 12 ? `${+to % 12} PM` : `${to} AM`;
    return `${moment(new Date(date)).format('dddd, MMMM DD, YYYY')} ${fromFormatted} - ${toFormatted} (EST)`;
};


export const parseJobData = (j) => {
    return {
        jobId: j._id,
        timeFrom: j.time_start,
        timeTo: j.time_end,
        date: j.date,
        rating: Math.random() * 5,
        status:j.completionStatus,
        completionStatus: j.completionStatus,
        serviceName:j.service,
        jobModified : j.job_modified_status,
        comments: [],
        customerName: 'John Doe',
        customerAddress: '1234 Main St, City, State, 12345',
        stage1Done: j.completion_steps?.stage_0.status_installer,
        stage2Done: j.completion_steps?.stage_1.status_installer,
        labourRate: j.labourRates,
        materialAllowance: j.materialCost,
        paymentAmount: j.customerShowingCost,
        materials: j.material_details.map((m) => {
            return m.material_id;
        }),
        chargers: [
            ...j.charger_details.map(
                (c) =>
                    ({
                        model: c.model,
                        type: c.type,
                        receivedBy: c.Charger_received_by,
                        outlet: c.existing_outlet,
                        upgradeToNEMA: c.upgraded_to_nema,
                        chargerLocation: c.charger_location,
                        attachedToHome: c.attached_home,
                        electricalPanelLocation: c.electrical_panel_location,
                        floor: c.floor,
                        interiorWallFinish: c.interior_wall_finish,
                        exteriorWallFinish: c.exterior_wall_finish,
                        wallConstruction: c.wall_construction,
                        electricalPanelType: c.electrical_panel_type,
                        panelBrand: c.panel_brand,
                        mainBreakerSize: c.main_breaker_size,
                        isMoreThan2BreakersOpen: c.greater_equal,
                        recessedPanel: c.recessed_panel,
                        distanceFromPanel: c.distance_panel,
                    }),
            ),
        ],
    };
};