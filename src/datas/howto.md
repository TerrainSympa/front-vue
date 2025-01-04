Get simplify coordinates for departments boundaries:
Load departments in Qgis:

Edit -> Select -> Select feature -> Select wanted departements

Vector -> Geometry tools -> Simplify -> Selected features only -> Tolerance 100 -> Run

Select Simplified layer -> Vector -> GeoProcessing tool -> Dissolve -> Run

Select Simplified layer -> Vector –> Geometry tools -> Extract vertices -> Run

Delete unwanted vertices

Right click Vertices -> Export -> Save as features... -> Format Comma separated values -> Change SRID (EPSG: 4326 WGS:84) + Layer option: GEOMETRY_YX -> Run

Get only coordinates and format them