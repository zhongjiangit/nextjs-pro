import { useSurveyOrgStore } from '@/contexts/useSurveyOrgStore';
import { useSurveySystemStore } from '@/contexts/useSurveySystemStore';
import { UserSystemType } from '@/interfaces/SystemType';
import type { RadioChangeEvent } from 'antd';
import { Button, Modal, Radio, Space } from 'antd';
import { FunctionComponent } from 'react';

interface SystemSwitchModalProps {
  systems?: UserSystemType[];
  isSystemModalOpen: boolean;
  setIsSystemModalOpen: (isSystemModalOpen: boolean) => void;
}

const SystemSwitchModal: FunctionComponent<SystemSwitchModalProps> = ({
  systems,
  isSystemModalOpen,
  setIsSystemModalOpen,
}) => {
  const setCurrentSystem = useSurveySystemStore(
    state => state.setCurrentSystem
  );
  const currentSystem = useSurveySystemStore(state => state.currentSystem);
  const setCurrentOrg = useSurveyOrgStore(state => state.setCurrentOrg);

  const onChange = (e: RadioChangeEvent) => {
    const currentSystem = systems?.find(
      system => system.systemId === e.target.value
    );
    setCurrentSystem(currentSystem);
    setCurrentOrg(currentSystem?.orgs[0]);
  };

  const handleOk = () => {
    setIsSystemModalOpen(false);
  };

  const handleCancel = () => {
    setIsSystemModalOpen(false);
  };

  return (
    <Modal
      width={400}
      title="系统切换"
      open={isSystemModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      footer={
        <div>
          <Button type="primary" onClick={handleOk}>
            确认
          </Button>
        </div>
      }
    >
      <div
        style={{
          padding: '24px 40px',
        }}
      >
        <Radio.Group onChange={onChange} value={currentSystem?.systemId}>
          <Space direction="vertical">
            {systems?.map(system => (
              <Radio key={system.systemId} value={system.systemId}>
                {system.systemName}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default SystemSwitchModal;