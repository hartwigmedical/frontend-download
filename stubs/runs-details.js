var runsDetailsStub = [
  {
    "id": 123,
    "name": "171026_HMFtest_AA11110000-A001",
    "files": [
      {
        "filename": "HMFtest_AA11110000_S28_L001_R1_001.fastq.gz",
        "filesize": 2035434955,
        "name": "FastQ",
        "fileid": 91,
        "tier_status": "RESTORE"
      },
      {
        "filename": "HMFtest_AA11110000_S28_L001_R2_001.fastq.gz",
        "filesize": 2035434955,
        "name": "FastQ",
        "fileid": 92,
        "tier_status": "COLD",
        "restore_time": 50
      }
    ]
  }, {
    "id": 1234,
    "name": "cancerPanelTwo",
    "files": [
      {
        "filename": "PatientReport.pdf",
        "filesize": 12345,
        "name": "patient_report",
        "fileid": 101,
        "tier_status": "HOT"
      }
    ]
  }, {
    "id": 123456,
    "name": "161207_VAL-S00025_v1.10_SingleSample",
    "files": [
      {
        "filename": "161207_VAL-S00025_v1.10_SingleSample.filtered_variants.annotated.vcf",
        "filesize": 2839957935,
        "name": "germline_vcf",
        "fileid": 111,
        "tier_status": "HOT"
      },
      {
        "filename": "161207_VAL-S00025_v1.10_SingleSample.filtered_variants.annotated.vcf.idx",
        "filesize": 1548284,
        "name": "FastQ",
        "fileid": 112,
        "tier_status": "RESTORE"
      },
      {
        "filename": "161207_VAL-S00025_v1.10_SingleSample.bamMetrics.pdf",
        "filesize": 84770,
        "name": "FastQ",
        "fileid": 113,
        "tier_status": "RESTORE"
      },
      {
        "filename": "GIAB12878b_dedup.realigned.bam.bai",
        "filesize": 8834784,
        "name": "FastQ",
        "fileid": 114,
        "tier_status": "COLD",
        "restore_time": 24
      },
      {
        "filename": "GIAB12878b_dedup.realigned.bam",
        "filesize": 69238369717,
        "name": "ref_sample_bam",
        "fileid": 115,
        "tier_status": "HOT"
      },
      {
        "filename": "GIAB12878b_dedup.realigned.g.vcf.gz",
        "filesize": 7096760025,
        "name": "ref_sample_gvcf",
        "fileid": 116,
        "tier_status": "HOT"
      },
      {
        "filename": "GIAB12878b_dedup.realigned.g.vcf.gz.tbi",
        "filesize": 3947347,
        "name": "ref_sample_gvcf_index",
        "fileid": 117,
        "tier_status": "HOT"
      }
    ]
  }, {
    "id": 1234567,
    "name": "161224_VAL-S00032_v1.11_KG",
    "files": [
      {
        "filename": "161224_VAL-S00032_v1.11_KG_extras.tar.gz",
        "filesize": 56516838,
        "name": "extras_tar",
        "fileid": 121,
        "tier_status": "HOT"
      },
      {
        "filename": "161224_VAL-S00032_v1.11_KG_extras.zip",
        "filesize": 56518134,
        "name": "extras_zip",
        "fileid": 122,
        "tier_status": "HOT"
      },
      {
        "filename": "161224_VAL-S00032_v1.11_KG.filtered_variants.annotated.vcf",
        "filesize": 2853754546,
        "name": "germline_vcf",
        "fileid": 123,
        "tier_status": "HOT"
      },
      {
        "filename": "161224_VAL-S00032_v1.11_KG.filtered_variants.annotated.vcf.idx",
        "filesize": 1548264,
        "name": "germline_vcf_index",
        "fileid": 124,
        "tier_status": "HOT"
      },
      {
        "filename": "161224_VAL-S00032_v1.11_KG.bamMetrics.pdf",
        "filesize": 84695,
        "name": "qc",
        "fileid": 125,
        "tier_status": "HOT"
      },
      {
        "filename": "GIAB12878a_dedup.bam.bai",
        "filesize": 8820384,
        "name": "ref_sample_bai",
        "fileid": 126,
        "tier_status": "HOT"
      },
      {
        "filename": "GIAB12878a_dedup.bam",
        "filesize": 64566771919,
        "name": "ref_sample_bam",
        "fileid": 127,
        "tier_status": "HOT"
      },
      {
        "filename": "GIAB12878a_dedup.recalibrated.g.vcf.gz",
        "filesize": 5145988432,
        "name": "ref_sample_gvcf",
        "fileid": 128,
        "tier_status": "HOT"
      },
      {
        "filename": "GIAB12878a_dedup.recalibrated.g.vcf.gz.tbi",
        "filesize": 3952007,
        "name": "ref_sample_gvcf_index",
        "fileid": 129,
        "tier_status": "HOT"
      }
    ]
  }, {
    "id": 12345678,
    "name": "GIAB_REGRESSION-170221",
    "files": [
      {
        "filename": "GIAB_REGRESSION-170221_extras.zip",
        "filesize": 381354,
        "name": "extras_zip",
        "fileid": 131
      },
      {
        "filename": "GIAB_REGRESSION-170221.annotated.vcf",
        "filesize": 3970182567,
        "name": "germline_vcf",
        "fileid": 132
      },
      {
        "filename": "GIAB_REGRESSION-170221.annotated.vcf.idx",
        "filesize": 1548256,
        "name": "germline_vcf_index",
        "fileid": 133
      },
      {
        "filename": "GIAB_REGRESSION-170221.bamMetrics.pdf",
        "filesize": 116201,
        "name": "qc",
        "fileid": 134
      },
      {
        "filename": "CPCT11111111R_dedup.realigned.bam.bai",
        "filesize": 8862520,
        "name": "ref_sample_bai",
        "fileid": 135
      },
      {
        "filename": "CPCT11111111R_dedup.realigned.bam",
        "filesize": 85953178962,
        "name": "ref_sample_bam",
        "fileid": 136
      },
      {
        "filename": "CPCT11111111R.g.vcf.gz",
        "filesize": 14565734939,
        "name": "ref_sample_gvcf",
        "fileid": 137
      },
      {
        "filename": "CPCT11111111R.g.vcf.gz.tbi",
        "filesize": 3794908,
        "name": "ref_sample_gvcf_index",
        "fileid": 138
      },
      {
        "filename": "CPCT11111111R_CPCT11111111T_melted.vcf",
        "filesize": 1213624890,
        "name": "somatic_vcf",
        "fileid": 139
      },
      {
        "filename": "CPCT11111111R_CPCT11111111T_melted.vcf.idx",
        "filesize": 1548190,
        "name": "somatic_vcf_index",
        "fileid": 140
      },
      {
        "filename": "CPCT11111111T_dedup.realigned.bam.bai",
        "filesize": 9661088,
        "name": "tumor_sample_bai",
        "fileid": 141
      },
      {
        "filename": "CPCT11111111T_dedup.realigned.bam",
        "filesize": 250886024970,
        "name": "tumor_sample_bam",
        "fileid": 142
      },
      {
        "filename": "CPCT11111111T.g.vcf.gz",
        "filesize": 2197678598,
        "name": "tumor_sample_gvcf",
        "fileid": 143
      },
      {
        "filename": "CPCT11111111T.g.vcf.gz.tbi",
        "filesize": 3571713,
        "name": "tumor_sample_gvcf_index",
        "fileid": 144
      },
      {
        "filename": "GIAB_REGRESSION-170221_extras.tar.gz",
        "filesize": 365438,
        "name": "extras_tar",
        "fileid": 145
      }
    ]
  }
]
