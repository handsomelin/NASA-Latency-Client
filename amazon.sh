#!/bin/bash
aws cloudwatch put-metric-data --metric-name Latency --namespace NasaFinal --dimensions From=$1,To=$2 --timestamp $3 --value $4 --unit Milliseconds
