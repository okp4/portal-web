export const kgSample = `
digraph {
    rankdir=LR
    nodesep=0.6
    bgcolor="none"
    edge [minlen="3"]
    graph [class="knowledge-graph"]
    s01 [shape="circle" xlabel="ADMIN EXPRESS COG\n 2020 DEPARTEMENT" label=""]
    s02 [shape="circle" xlabel="ADMIN EXPRESS COG\n 2020 REGION" label=""]
    s03 [shape="circle" xlabel="RPG FRANCE 2020" label=""]
    s04 [shape="circle" xlabel="Table référentielle des cultures\n et des groupes de cultures du RPG" label=""]
    s05 [shape="circle" xlabel="AGRESTE 2020"label="" ]
    s06 [shape="rectangle" style="rounded,filled" label="Data Selector" ]
    s07 [shape="rectangle" style="rounded,filled" label="Data Selector" ]
    s08 [shape="rectangle" style="rounded,filled" label="Data Selector" ]
    s09 [shape="rectangle" style="rounded,filled" label="Data Refactor" ]
    s10 [shape="rectangle" style="rounded,filled" label="Data Refactor" ]
    s11 [shape="rectangle" style="rounded,filled" label="Data Refactor" ]
    s12 [shape="rectangle" style="rounded,filled" label="Data Refactor" ]
    s13 [shape="rectangle" style="rounded,filled" label="Data Join Tabular" ]
    s14 [shape="rectangle" style="rounded,filled" label="Data Join Tabular" ]
    s15 [shape="rectangle" style="rounded,filled" label="Data Join Tabular" ]
    s16 [shape="rectangle" style="rounded,filled" label="Data Join Geospatial" ]
    s17 [shape="rectangle" style="rounded,filled" label="Data Grouping" ]
    s18 [shape="circle"  xlabel="RPG AGRESTE" label=""]
    s01 -> s06 -> s09  -> s13
    s02 -> s07 -> s10  -> s13
    s13 -> s16 -> s17 -> s15
    s03 -> s08 -> s11 -> s14 
    s04 -> s14 -> s12 -> s16
    s05 -> s15 -> s18
}
`