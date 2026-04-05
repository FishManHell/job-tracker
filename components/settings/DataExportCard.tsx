"use client";

import { Card, Button, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export function DataExportCard() {
  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <DownloadOutlined style={{ color: "#6366f1" }} />
          <span>Export Your Data</span>
        </div>
      }
    >
      <Text type="secondary" className="block mb-4">
        Download all your applications, interviews, and companies as a JSON file.
        Your data belongs to you.
      </Text>

      <a href="/api/export" download="job-tracker-export.json">
        <Button icon={<DownloadOutlined />} size="large">
          Download JSON
        </Button>
      </a>
    </Card>
  );
}
