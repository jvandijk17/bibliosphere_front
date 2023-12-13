import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

@Injectable({
    providedIn: 'root'
})
export class EntityDataService<T> {
    private dataSource = new BehaviorSubject<MatTableDataSource<T>>(new MatTableDataSource<T>([]));

    get dataSource$(): Observable<MatTableDataSource<T>> {
        return this.dataSource.asObservable();
    }

    getCurrentDataSource(): MatTableDataSource<T> {
        return this.dataSource.getValue();
    }

    setDataSource(entities: T[]) {
        this.dataSource.next(new MatTableDataSource(entities));
    }

    updateEntity(updatedEntity: T, identifier: keyof T) {
        const currentDataSource = this.getCurrentDataSource();
        const updatedData = currentDataSource.data.map(entity =>
            entity[identifier] === updatedEntity[identifier] ? updatedEntity : entity
        );
        this.setDataSource(updatedData);
    }

    removeEntity(id: number, identifier: keyof T) {
        const currentDataSource = this.getCurrentDataSource();
        const filteredEntities = currentDataSource.data.filter(entity => entity[identifier] !== id);
        this.setDataSource(filteredEntities);
    }
}
